namespace Bang.Game
{
    public class Question
    {
        public QuestionType Type { get; init; }
        public string Title { get; init; }
        public Answer[] Answers { get; init; }
        public string CorrectId { get; init; }
        public int Wait { get; init; }

        public QuestionData ExtraData { get; init; }
    }
}