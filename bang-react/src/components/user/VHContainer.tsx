import React, { useContext } from "react";

import { AnswerResultView } from "./AnswerResultView";
import { Box } from "@material-ui/core";
import { Context } from "../../context";
import { FinishView } from "./FinishView";
import { QuestionType } from "../../api";
import { QuestionWait } from ".";
import { UserPressButtonQuestion } from "./UserPressButtonQuestion";
import { UserQuestion } from "./UserQuestion";
import { use100vh } from "react-div-100vh";
import { useRecoilValue } from "recoil";

export function VHContainer() {
    const { recoil } = useContext(Context);
    const h = use100vh();

    const question = useRecoilValue(recoil.question);
    const answerResult = useRecoilValue(recoil.answerResult);
    const finishResult = useRecoilValue(recoil.finish);

    let component;

    if(finishResult) {
        component = <FinishView result={finishResult} />
    }
    else if (question) {
        switch (question.type) {
            case QuestionType.Trivia:
                component = <UserQuestion question={question} />
                break;
            case QuestionType.PressButton:
                component = <UserPressButtonQuestion question={question} />
                break;
        }
    } else if (answerResult) {
        component = <AnswerResultView result={answerResult} />;
    } else {
        component = <QuestionWait />;
    }

    return (
        <Box
            display="flex"
            style={{
                height: h as number,
            }}
        >
            {component}
        </Box>
    );
}
