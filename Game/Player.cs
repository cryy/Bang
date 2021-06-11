namespace Bang.Game
{
    public class Player
    {
        public string Name { get; init; }
        public string Email { get; init; }
        public string ConnectionId { get; init; }
        public bool IsAdmin { get; init; }
        
        
        public int Points { get; set; }
        public int Streak { get; set; }
    }
}