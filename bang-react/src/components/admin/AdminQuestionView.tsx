import { Box, Grid, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";

import { AdminButtonQuestion } from "./AdminButtonQuestion";
import { AdminFinishView } from "./AdminFinishView";
import { AdminTriviaQuestion } from "./AdminTriviaQuestion";
import { Context } from "../../context";
import { QuestionType } from "../../api";
import { use100vh } from "react-div-100vh";
import { useRecoilValue } from "recoil";

export function AdminQuestionView() {
    const { recoil } = useContext(Context);

    const question = useRecoilValue(recoil.question);
    const finishResult = useRecoilValue(recoil.finish);

    let component;

    if(finishResult) {
        component = <AdminFinishView />
    }
    else if (question) {
        switch (question.type) {
            case QuestionType.Trivia:
                component = <AdminTriviaQuestion question={question} />
                break;
            case QuestionType.PressButton:
                component = <AdminButtonQuestion question={question} />
                break;
        }
    }

    return <>{component}</>;
}
