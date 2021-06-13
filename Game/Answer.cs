namespace Bang.Game
{
    public class Answer
    {
        public Answer(string id, string value)
        {
            Id = id;
            Value = value;
        }

        public Answer()
        {
        }

        public string Id { get; init; }
        public string Value { get; init; }
    }
}