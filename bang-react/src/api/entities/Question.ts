import { Answer, QuestionData, QuestionType } from ".";

export interface Question {
    type: QuestionType;
    title: string;
    answers: Answer[];
    correctId?: string;
    wait?: number;
    extraData?: QuestionData;
}