using Bang.Game;

namespace Bang.WebSocket.API
{
    public class APIQuestion
    {
        public APIQuestion(Question question)
        {
            Type = question.Type;
            Title = question.Title;
            Answers = question.Answers;
            ExtraData = question.ExtraData;
        }

        public QuestionType Type { get; }
        public string Title { get; }
        public Answer[] Answers { get; }
        
        public QuestionData ExtraData { get; }
    }
}