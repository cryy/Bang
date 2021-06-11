namespace Bang.WebSocket.API
{
    public class FinishResult
    {
        public int Place { get; init; }
        
        public FinishResult(int place)
        {
            Place = place;
        }
        
        public FinishResult() { }
    }
}