import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";

import { Context } from "../../context";
import { Question } from "../../api";
import React from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useRecoilValue } from "recoil";
import { useState } from "react";

export interface UserPressButtonQuestionProps {
    question: Question;
}

export function UserPressButtonQuestion({ question }: UserPressButtonQuestionProps) {
    const { recoil, api } = useContext(Context);

    const stopVote = useRecoilValue(recoil.stopVote);

    const [presses, setPresses] = useState(0);

    const press = () => {
        if (stopVote) return;
        setPresses((p) => p + 1);
    };

    React.useEffect(() => {
        if (stopVote) {
            api.answerAsync(presses.toString()).catch((err) => {
                toast.error(err.toString(), {
                    position: "bottom-left",
                });
            });
        }
    }, [stopVote]);
    console.log(question);

    return (
        <Grid container spacing={0} height="100%" justifyContent="center" alignItems="center">
            <Grid item xs={1} />
            <Grid item xs={10}>
                <Grid
                    container
                    spacing={0}
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    margin="-64px 0 0 0"
                >
                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Button
                            size="large"
                            variant="contained"
                            disabled={stopVote}
                            onClick={() => press()}
                            sx={{
                                width: "128px",
                                height: "64px",
                                fontWeight: 700,
                                fontSize: "1.01rem"
                            }}
                        >
                            {question.extraData?.buttonText
                                ? question.extraData.buttonText
                                : "Stisni me!"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
