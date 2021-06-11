import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Context } from "../../context";
import { Question } from "../../api";
import { use100vh } from "react-div-100vh";

export interface AdminButtonQuestionProps {
    question: Question;
}

let interval: NodeJS.Timeout | null = null;

export function AdminButtonQuestion({ question }: AdminButtonQuestionProps) {
    const { recoil, api } = useContext(Context);

    const h = use100vh();

    const setQuestion = useSetRecoilState(recoil.question);
    const players = useRecoilValue(recoil.players);

    const [exposeCorrectAnswer, setExposeCorrectAnswer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(question!.wait! / 1000);

    React.useEffect(() => {

        const handler = () => {
            if(interval)
            {
                clearInterval(interval);
                interval = null;
                
                setTimeLeft(0);
                setExposeCorrectAnswer(true);
            }
        };

        api.connection.on("ForceStopTimeout", handler);

        interval = setInterval(() => {
            setTimeLeft((time) => {
                if (time === 1) {
                    clearInterval(interval!);
                    interval = null;
                    setExposeCorrectAnswer(true);
                    return 0;
                } else return time - 1;
            });
        }, 1000);

        return (() => {
            api.connection.off("ForceStopTimeout", handler);
        });
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
            <Grid item xs={12} height="64px" margin="32px 0 0 0">
                <Typography fontSize="2rem" fontWeight="600" textAlign="center">
                    {question?.title}
                </Typography>
            </Grid>

            <Grid item xs={12} margin="14px 0 0 0" height="14px">
            </Grid>

            <Grid item xs={4} height="64px" />
            <Grid
                item
                xs={2}
                height="64px"
                display="flex"
                justifyContent="center"
                alignContent="center"
                flexDirection="column"
            >
                <Typography fontWeight="600" fontSize="1.6rem" textAlign="center">
                    Igrači
                </Typography>
                <Typography fontWeight="500" fontSize="1.4rem" textAlign="center">
                    {players.length}
                </Typography>
            </Grid>
            <Grid
                item
                xs={2}
                height="64px"
                display="flex"
                justifyContent="center"
                alignContent="center"
                flexDirection="column"
            >
                <Typography fontWeight="600" fontSize="1.6rem" textAlign="center">
                    Preostalo vremena
                </Typography>
                <Typography fontWeight="500" fontSize="1.4rem" textAlign="center">
                    {timeLeft}s
                </Typography>
            </Grid>
            <Grid item xs={4} height="64px" />

            <Grid item xs={2} />
            <Grid item xs={8}>
                <Grid
                    container
                    spacing={0}
                    height="300px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography fontWeight="600" fontSize="1.8rem">
                        {exposeCorrectAnswer
                            ? `Trebali ste stisnuti gumb ${question.correctId} puta.`
                            : ""}
                    </Typography>
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
