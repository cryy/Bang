namespace Bang.WebSocket.API
{
    public class FinishResult
    {
        public FinishResult(int place)
        {
            Place = place;
        }

        public FinishResult()
        {
        }

        public int Place { get; init; }
    }
}