using Bang.Game;

namespace Bang.WebSocket.API
{
    public class AdminLoginMessage : Message
    {
        public Player[] Players { get; set; }
    }
}