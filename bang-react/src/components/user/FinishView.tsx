import { Box, Typography } from "@material-ui/core";

import { FinishResult } from "../../api";
import React from "react";

export interface FinishViewProps {
    result: FinishResult;
}

export function FinishView({ result }: FinishViewProps) {
    return (
        <Box
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography textAlign="center" fontWeight="600" fontSize="2.1rem">
                Kviz je gotov!
            </Typography>
            <Typography textAlign="center" fontWeight="600" fontSize="2.1rem">
                Na{" "}
                <Typography component="span" fontWeight="700" fontSize="2.1rem">
                    {result.place}.
                </Typography>{" "}
                ste mjestu!
            </Typography>
        </Box>
    );
}
