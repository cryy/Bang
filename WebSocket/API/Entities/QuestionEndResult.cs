using System.Collections.Generic;
using Bang.Game;

namespace Bang.WebSocket.API
{
    public class QuestionEndResult
    {
        public QuestionEndResult(IEnumerable<Player> players)
        {
            Players = players;
        }

        public QuestionEndResult()
        {
        }

        public IEnumerable<Player> Players { get; set; }
    }
}