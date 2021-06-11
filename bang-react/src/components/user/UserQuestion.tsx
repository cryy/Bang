import { Box, Grid, Paper, Typography } from "@material-ui/core";

import { Context } from "../../context";
import { Question } from "../../api";
import React from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useRecoilValue } from "recoil";
import { useState } from "react";

export interface UserQuestionProps {
    question: Question;
}

export function UserQuestion({ question }: UserQuestionProps) {
    const { recoil, api } = useContext(Context);

    const stopVote = useRecoilValue(recoil.stopVote);

    const [submitted, setSubmitted] = useState<string | null>(null);

    const canSubmit = !submitted && !stopVote;

    const submit = (id: string) => {
        if (!canSubmit) return;
        setSubmitted(id);
        api.answerAsync(id).catch((err) => {
            toast.error(err.toString(), {
                position: "bottom-left",
            });
        });
    };

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
                    {question.answers.map((q) => (
                        <Grid
                            item
                            xs={6}
                            md={3}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            margin="64px 0 0 0"
                        >
                            <Paper
                                onClick={() => submit(q.id)}
                                sx={
                                    submitted === q.id
                                        ? {
                                              cursor: "pointer",
                                              border: "2px solid #1990e9",
                                              transition: "0.5s",
                                          }
                                        : submitted
                                        ? null
                                        : {
                                              cursor: "pointer",
                                          }
                                }
                                elevation={submitted ? 0 : 4}
                            >
                                <Box
                                    height="124px"
                                    width="124px"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Typography fontWeight="600" fontSize="2rem">
                                        {q.id}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
