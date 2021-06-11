using System;
using System.Linq;
using System.Threading.Tasks;
using Bang.Game;
using Bang.Services;
using Bang.WebSocket.API;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;

namespace Bang.WebSocket
{
    public class GameHub : Hub
    {
        private GameService _game;
        private DisconnectService _disconnect;
        private IConfiguration _config;
        public GameHub(DisconnectService disconnect, GameService game, IConfiguration config)
        {
            _game = game;
            _disconnect = disconnect;
            _config = config;
        }

        public override Task OnConnectedAsync()
        {
            _disconnect.Monitor(Context);
            return base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _game.RemovePlayer(Context.ConnectionId);
            await Clients.Group("Admin").SendAsync("UserLogout", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task<Message> LoginAsync(string email, string detail)
        {
            var message = new Message();
            var player = new Player
            {
                Email = email,
                Name = detail,
                ConnectionId = Context.ConnectionId,
                IsAdmin = false,
                Points = 0,
                Streak = 0
            };
            if (_game.Started)
                message.ErrorMessage = "Igra je počela.";
            else if (!_game.AddPlayer(Context.ConnectionId, player))
                message.ErrorMessage = "Dogodila se pogreška.";
            else
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, "Player");
                await Clients.Group("Admin").SendAsync("UserLogin", player);
            }

            return message;
        }

        public async Task<Message> AdminLoginAsync(string key)
        {
            var message = new AdminLoginMessage();

            if (key != _config["AdminKey"])
                message.ErrorMessage = "Netočan ključ.";
            else if (_game.GetPlayers().Any(x => x.IsAdmin) || !_game.AddPlayer(Context.ConnectionId, new Player
            {
                Email = "unset",
                Name = "ADMIN",
                ConnectionId = Context.ConnectionId,
                IsAdmin = true,
                Points = 0,
                Streak = 0
            }))
                message.ErrorMessage = "Dogodila se pogreška.";
            else
            {
                message.Players = _game.GetPlayers().ToArray();
                await Groups.AddToGroupAsync(Context.ConnectionId, "Admin");
            }

            return message;
        }

        public async Task<Message> StartAsync()
        {
            var message = new Message();

            var player = _game.GetPlayer(Context.ConnectionId);

            if (_game.Started)
                message.ErrorMessage = "Igra je počela.";
            else if (player == null)
                message.ErrorMessage = "Nisi ulogiran.";
            else if (!player.IsAdmin)
                message.ErrorMessage = "Nisi admin.";
            else
            {
                await _game.StartAsync();
            }

            return message;
        }

        public async Task<Message> KickAsync(string connectionId)
        {
            var message = new Message();

            var player = _game.GetPlayer(Context.ConnectionId);

            if (player == null)
                message.ErrorMessage = "Nisi ulogiran.";
            else if (!player.IsAdmin)
                message.ErrorMessage = "Nisi admin.";
            else
            {
                _disconnect.Kick(connectionId);
            }

            return message;
        }

        public Task<Message> Answer(string id)
        {
            var message = new Message();

            if (!_game.TakingAnswers)
                message.ErrorMessage = "Trenutno ne možeš odgovoriti.";
            else if (!_game.PushAnswer(Context.ConnectionId, id))
                message.ErrorMessage = "Tvoj odgovor se nije mogao dodati.";
            
            return Task.FromResult(message);
        }
        
        public Task<Message> NextAsync()
        {
            var message = new Message();

            var player = _game.GetPlayer(Context.ConnectionId);
            
            if (player == null)
                message.ErrorMessage = "Nisi ulogiran.";
            else if (!player.IsAdmin)
                message.ErrorMessage = "Nisi admin.";
            else
            {
                _ = _game.NextQuestionAsync();
            }

            return Task.FromResult(message);
        }


    }
}