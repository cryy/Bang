import { Box, Typography } from "@material-ui/core";

import { AnswerResult } from "../../api";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import React from "react";

export interface AnswerResultViewProps {
    result: AnswerResult;
}

export function AnswerResultView({ result }: AnswerResultViewProps) {
    return (
        <Box
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            {result.correct ? (
                <>
                    <DoneRoundedIcon
                        sx={{
                            width: "2em",
                            height: "2em",
                            color: "success.main",
                        }}
                    />
                    <Typography textAlign="center" fontWeight="600" fontSize="2.1rem">
                        Tvoj odgovor je bio točan!
                    </Typography>
                    <Typography textAlign="center" fontWeight="500" fontSize="1.8rem">
                        +{result.pointsReceived}
                    </Typography>
                </>
            ) : (
                <>
                    <CloseRoundedIcon
                        sx={{
                            width: "2em",
                            height: "2em",
                            color: "error.main",
                        }}
                    />
                    <Typography textAlign="center" fontWeight="600" fontSize="2.1rem">
                        Tvoj odgovor je bio netočan!
                    </Typography>
                </>
            )}
        </Box>
    );
}
