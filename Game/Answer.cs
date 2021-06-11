namespace Bang.Game
{
    public class Answer
    {
        public string Id { get; init; }
        public string Value { get; init; }

        public Answer(string id, string value)
        {
            Id = id;
            Value = value;
        }
        
        public Answer() { }
    }
}