using Bang.Game;

namespace Bang.WebSocket.API
{
    public class APIQuestion
    {
        public QuestionType Type { get; }
        public string Title { get; }
        public Answer[] Answers { get; }
        
        public APIQuestion(Question question)
        {
            Type = question.Type;
            Title = question.Title;
            Answers = question.Answers;
        }
    }
}