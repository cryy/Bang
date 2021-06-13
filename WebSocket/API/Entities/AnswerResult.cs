namespace Bang.WebSocket.API
{
    public class AnswerResult
    {
        public AnswerResult(bool correct, int points, int pointsReceived, int streak)
        {
            Correct = correct;
            Points = points;
            PointsReceived = pointsReceived;
            Streak = streak;
        }

        public AnswerResult()
        {
        }

        public bool Correct { get; init; }
        public int Points { get; init; }
        public int Streak { get; init; }
        public int PointsReceived { get; init; }
    }
}