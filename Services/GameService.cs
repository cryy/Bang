using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Bang.WebSocket;
using Bang.Game;
using Bang.WebSocket.API;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;

namespace Bang.Services
{
    public class GameService
    {
        private IHubContext<GameHub> _hubContext;
        private IConfiguration _config;
        private HttpClient _http;
        private ConcurrentDictionary<string, Player> _players;
        private Question[] _questions;
        private int _questionIndex;

        private Question _currentQuestion;
        private ConcurrentDictionary<string, (DateTimeOffset when, string id)> _answers;
        private CancellationTokenSource _cts;

        public bool Started { get; private set; }
        public bool TakingAnswers { get; private set; }

        public int AnswerAmount => _answers.Count;
        public int PlayersAmount => _players.Count;

        public GameService(HttpClient httpClient, IConfiguration config, IHubContext<GameHub> hubContext)
        {
            _questionIndex = 0;
            _questions = new Question[]
            {
                new()
                {
                    Type = QuestionType.Trivia,
                    Title = "Na natjecanju u kuhanje sujeluje 10 natjecatelja. Koliko je mogućih poredaka tih natjecatelja?",
                    Answers = new Answer[]
                    {
                        new("A", "2 420 800"),
                        new("B", "10 * 10"),
                        new("C", "20!"),
                        new("D", "3 680 800")
                    },
                    CorrectId = "D",
                    Wait = 15000
                },
                new()
                {
                    Type = QuestionType.Trivia,
                    Title = "Grupa učenika sastavljena je od 5 dječaka i 3 djevojčice. Na koliko različitih načina se mogu složiti učenici, tako da su djevojčice uvijek na prva dva mjesta?",
                    Answers = new Answer[]
                    {
                        new("A", "1460"),
                        new("B", "5^3"),
                        new("C", "720"),
                        new("D", "150")
                    },
                    CorrectId = "C",
                    Wait = 20000
                },
                new (){
                    Type = QuestionType.PressButton,
                    Title = "Pritisni gumb 3! puta.",
                    Answers = new Answer[] { },
                    CorrectId = "6",
                    Wait = 10000
                },
                new()
                {
                    Type = QuestionType.Trivia,
                    Title = "Na koliko različitih načina se mogu složiti slova riječi sova?",
                    Answers = new Answer[]
                    {
                        new("A", "8"),
                        new("B", "14"),
                        new("C", "16"),
                        new("D", "24")
                    },
                    CorrectId = "D",
                    Wait = 15000
                },
                new()
                {
                    Type = QuestionType.Trivia,
                    Title = "U vazi su 6 crvenih, 4 bijela i 2 žuta cvijeta. Koliko kombinacija se može napraviti, u kojima bi bila 4 cvijeta a tako da budu dva crvena, jedan bijeli i jedan žuti?",
                    Answers = new Answer[]
                    {
                        new("A", "120"),
                        new("B", "460"),
                        new("C", "326"),
                        new("D", "48")
                    },
                    CorrectId = "A",
                    Wait = 35000
                },
                new()
                {
                    Type = QuestionType.Trivia,
                    Title = "Na klupi su slobodna četiri mjesta. Na koliko načina 15 osoba može popuniti ta 4 mjesta?",
                    Answers = new Answer[]
                    {
                        new("A", "36500"),
                        new("B", "15000"),
                        new("C", "32760"),
                        new("D", "31680")
                    },
                    CorrectId = "C",
                    Wait = 20000
                },
                new()
                {
                    Type = QuestionType.Trivia,
                    Title = "Odredi broj permutacija. { a, a, a, b, b, b, c }",
                    Answers = new Answer[]
                    {
                        new("A", "80"),
                        new("B", "140"),
                        new("C", "180"),
                        new("D", "220")
                    },
                    CorrectId = "B",
                    Wait = 20000
                },
                new (){
                    Type = QuestionType.PressButton,
                    Title = "Pritisni gumb 0! puta.",
                    Answers = new Answer[] { },
                    CorrectId = "1",
                    Wait = 10000
                },                
                new()
                {
                    Type = QuestionType.Trivia,
                    Title = "Na koliko se nacina moze poredati 8 auta sa parkinga bez obzira na to tko će biti na prvom mjestu?",
                    Answers = new Answer[]
                    {
                        new("A", "40 320"),
                        new("B", "16 420"),
                        new("C", "32 000"),
                        new("D", "8! - 1")
                    },
                    CorrectId = "A",
                    Wait = 20000
                },
                new()
                {
                    Type = QuestionType.Trivia,
                    Title = "Na koliko načina se može 8 topova razmjestit na šahovsku ploču ali da se međusobno ne napadaju?",
                    Answers = new Answer[]
                    {
                        new("A", "46 900"),
                        new("B", "12!"),
                        new("C", "8!"),
                        new("D", "40 300")
                    },
                    CorrectId = "C",
                    Wait = 20000
                },
            };

            _hubContext = hubContext;
            _config = config;
            _http = httpClient;
            _players = new();

            _answers = new();

            Started = false;
            TakingAnswers = false;
        }

        public bool AddPlayer(string connection, Player player)
        {
            if (_players.Any(x => x.Key == connection)) return false;

            return _players.TryAdd(connection, player);
        }

        public (bool success, Player player) RemovePlayer(string connection)
        {
            Player player;
            var tryRemove = _players.TryRemove(connection, out player);

            return (tryRemove, player);
        }

        public Player GetPlayer(string connection)
        {
            Player player;
            _players.TryGetValue(connection, out player);
            return player;
        }

        public ICollection<Player> GetPlayers()
        {
            return _players.Values;
        }

        public async Task NextQuestionAsync()
        {
            if (_questionIndex == _questions.Length)
            {
                _currentQuestion = null;
                _answers.Clear();
                _questionIndex = 0;
                Started = false;

                var tasks = new List<Task>();
                var orderedPlayers = _players.Values.Where(x => !x.IsAdmin).OrderByDescending(x => x.Points);

                for (var i = 0; i < orderedPlayers.Count(); i++)
                {
                    var player = orderedPlayers.ElementAt(i);

                    tasks.Add(_hubContext.Clients.Client(player.ConnectionId)
                        .SendAsync("QuizFinish",
                            new FinishResult(i + 1)));
                }

                tasks.Add(_hubContext.Clients.Group("Admin").SendAsync("QuizFinish", new FinishResult(0)));
                await Task.WhenAll(tasks);

            }
            else
            {
                _currentQuestion = _questions[_questionIndex];
                var apiQuestion = new APIQuestion(_currentQuestion);
                
                await _hubContext.Clients.Group("Admin").SendAsync("Question", _currentQuestion);
                await _hubContext.Clients.Groups("Player", "Admin").SendAsync("QuestionReady");
                


                switch (_currentQuestion.Type)
                {
                    case QuestionType.Trivia:
                        await Trivia(apiQuestion);
                        break;
                    case QuestionType.PressButton:
                        await Button(apiQuestion);
                        break;
                }
                _questionIndex++;
                
            }
        }

        private async Task Button(APIQuestion apiQuestion)
        {
            TakingAnswers = true;
            await _hubContext.Clients.Group("Player").SendAsync("Question", apiQuestion);
            _cts = new CancellationTokenSource();
            try
            {
                await Task.Delay(_currentQuestion.Wait, _cts.Token);
            }
            catch
            {
                // ignored
            }

            _cts.Dispose();
            _cts = null;

            await _hubContext.Clients.Group("Player").SendAsync("StopVote");

            await Task.Delay(2200);
            TakingAnswers = false;


            var tasks = new List<Task>();
            var orderedAnswersCorrect = _answers.Where(v => v.Value.id == _currentQuestion.CorrectId).ToList();
            for (var i = 0; i < _players.Count; i++)
            {
                var player = _players.Values.ElementAt(i);
                if (player.IsAdmin) continue;

                var points = 0;

                var answerResult = false;
                var answerIndex = orderedAnswersCorrect.FindIndex(x => x.Key == player.ConnectionId);
                if (answerIndex != -1)
                {
                    answerResult = true;

                    points = 1000;

                    if (player.Streak > 1)
                        points += (player.Streak - 1) * 100;
                    
                    player.Streak++;
                    player.Points += points;
                }
                else
                {
                    player.Streak = 0;
                }

                tasks.Add(_hubContext.Clients.Client(player.ConnectionId)
                    .SendAsync("AnswerResult",
                        new AnswerResult(answerResult, player.Points, points, player.Streak)));
            }

            await Task.WhenAll(tasks);

            _answers.Clear();
            await _hubContext.Clients.Group("Admin")
                .SendAsync("PlayersUpdate", new QuestionEndResult(_players.Values));
        }
        
        private async Task Trivia(APIQuestion apiQuestion)
        {
            await Task.Delay(5000);
                
            TakingAnswers = true;
            await _hubContext.Clients.Group("Player").SendAsync("Question", apiQuestion);
            _cts = new CancellationTokenSource();
            try
            {
                await Task.Delay(_currentQuestion.Wait, _cts.Token);
            }
            catch
            {
                // ignored
            }

            _cts.Dispose();
            _cts = null;

            TakingAnswers = false;
            await _hubContext.Clients.Group("Player").SendAsync("StopVote");
            
            var tasks = new List<Task>();
            var orderedAnswers = _answers.OrderBy((v) => v.Value.when).ToList();
            var orderedAnswersCorrect = orderedAnswers.Where(v => v.Value.id == _currentQuestion.CorrectId).ToList();
            for (var i = 0; i < _players.Count; i++)
            {
                var player = _players.Values.ElementAt(i);
                if (player.IsAdmin) continue;

                var points = 0;

                var answerResult = false;
                var answerIndex = orderedAnswersCorrect.FindIndex(x => x.Key == player.ConnectionId);
                if (answerIndex != -1)
                {
                    answerResult = true;


                    points = 1000;

                    if (player.Streak > 1)
                        points += (player.Streak - 1) * 100;

                    if (answerIndex < 3)
                        points += Math.Abs(answerIndex - 3) * 150;


                    player.Streak++;
                    player.Points += points;
                }
                else
                {
                    player.Streak = 0;
                }

                tasks.Add(_hubContext.Clients.Client(player.ConnectionId)
                    .SendAsync("AnswerResult",
                        new AnswerResult(answerResult, player.Points, points, player.Streak)));
            }

            await Task.WhenAll(tasks);

            _answers.Clear();
            await _hubContext.Clients.Group("Admin")
                .SendAsync("PlayersUpdate", new QuestionEndResult(_players.Values));
        }


        public bool PushAnswer(string connectionId, string id)
        {
            if (!TakingAnswers) throw new Exception("Odgovori se ne primaju.");
            if (_currentQuestion.Type == QuestionType.Trivia && !_currentQuestion.Answers.Any(x => x.Id == id))
                return false;

            var result = _answers.TryAdd(connectionId, (DateTimeOffset.UtcNow, id));


            if (AnswerAmount == PlayersAmount - 1)
            {
                _ = _hubContext.Clients.Group("Admin").SendAsync("ForceStopTimeout");
                _cts?.Cancel();
            }


            return result;
        }

        public async Task StartAsync()
        {
            if (Started) throw new Exception("Igra već pokrenuta.");

            Started = true;
            await _hubContext.Clients.Groups("Player", "Admin").SendAsync("Start");
            _ = Task.Delay(5500).ContinueWith(_ => NextQuestionAsync());
        }

    }
}