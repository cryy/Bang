import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Context } from "../../context";
import { Question } from "../../api";
import { use100vh } from "react-div-100vh";

export interface AdminTriviaQuestionProps {
    question: Question;
}

let interval: NodeJS.Timeout | null = null;

export function AdminTriviaQuestion({ question }: AdminTriviaQuestionProps) {
    const { recoil, api } = useContext(Context);

    const h = use100vh();

    const setQuestion = useSetRecoilState(recoil.question);
    const players = useRecoilValue(recoil.players);

    const [doTransition, setDoTransition] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const [exposeCorrectAnswer, setExposeCorrectAnswer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(question!.wait! / 1000);

    React.useEffect(() => {
        const handler = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;

                setTimeLeft(0);
                setExposeCorrectAnswer(true);
            }
        };

        api.connection.on("ForceStopTimeout", handler);

        setTimeout(() => {
            setDoTransition(true);
        }, 300);

        setTimeout(() => {
            setShowAnswers(true);
            interval = setInterval(() => {
                setTimeLeft((time) => {
                    if (time === 1) {
                        clearInterval(interval!);
                        setExposeCorrectAnswer(true);
                        return 0;
                    } else return time - 1;
                });
            }, 1000);
        }, 5000);

        return () => {
            api.connection.off("ForceStopTimeout", handler);
        };
    }, []);

    const next = () => {
        setQuestion(null);
        api.nextAsync();
    };

    return (
        <Grid
            container
            spacing={0}
            display="flex"
            style={{
                height: h as number,
            }}
        >
            <Grid item xs={2} />
            <Grid item xs={8} height="64px" margin="32px 0 0 0">
                <Typography fontSize="2rem" fontWeight="600" textAlign="center">
                    {question?.title}
                </Typography>
            </Grid>
            <Grid item xs={2} />

            <Grid item xs={12} margin="14px 0 0 0" height="14px">
                <Box
                    sx={{
                        transition: "4700ms",
                        height: "14px",
                        backgroundColor: "#10aa10",
                        width: doTransition ? "0" : "100%",
                    }}
                ></Box>
            </Grid>

            <Grid
                item
                xs={6}
                height="124px"
                display="flex"
                justifyContent="center"
                alignContent="center"
                flexDirection="column"
            >
                <Typography fontWeight="500" fontSize="1.6rem" textAlign="center">
                    Igrači
                </Typography>
                <Typography fontWeight="400" fontSize="1.4rem" textAlign="center">
                    {players.length}
                </Typography>
            </Grid>
            <Grid
                item
                xs={6}
                height="124px"
                display="flex"
                justifyContent="center"
                alignContent="center"
                flexDirection="column"
            >
                <Typography fontWeight="500" fontSize="1.6rem" textAlign="center">
                    Preostalo vremena
                </Typography>
                <Typography fontWeight="400" fontSize="1.4rem" textAlign="center">
                    {timeLeft}s
                </Typography>
            </Grid>

            <Grid item xs={2} />
            <Grid item xs={8}>
                <Grid container spacing={0} height="300px">
                    {showAnswers
                        ? question.answers.map((a) => (
                              <Grid
                                  item
                                  xs
                                  key={a.id}
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                              >
                                  <Paper
                                      variant="outlined"
                                      elevation={0}
                                      sx={
                                          exposeCorrectAnswer
                                              ? a.id === question.correctId
                                                  ? {
                                                        border: "1px solid rgb(22, 193, 33)",
                                                    }
                                                  : {
                                                        border: "1px solid rgb(255, 0, 0)",
                                                    }
                                              : null
                                      }
                                  >
                                      <Grid
                                          container
                                          spacing={0}
                                          width="200px"
                                          height="100px"
                                          display="flex"
                                          justifyContent="center"
                                          alignContent="center"
                                      >
                                          <Grid item xs={3} display="flex" justifyContent="center">
                                              <Typography fontWeight="600" fontSize="1.6rem">
                                                  {a.id}
                                              </Typography>
                                          </Grid>
                                          <Grid item xs={1} />
                                          <Grid item xs={6}>
                                              <Typography fontSize="1.6rem" textAlign="center">
                                                  {a.value}
                                              </Typography>
                                          </Grid>
                                      </Grid>
                                  </Paper>
                              </Grid>
                          ))
                        : ""}
                </Grid>
            </Grid>
            <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                {exposeCorrectAnswer ? (
                    <Button variant="contained" onClick={() => next()}>
                        Dalje
                    </Button>
                ) : (
                    ""
                )}
            </Grid>
        </Grid>
    );
}
