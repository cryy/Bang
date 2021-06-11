import { Box, CircularProgress, Typography } from "@material-ui/core";

import React from "react";
import { use100vh } from "react-div-100vh";

export function GameIsStarting() {
    const h = use100vh();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            style={{
                height: h as number,
            }}
        >
            <Typography textAlign="center" fontWeight="600" fontSize="2.1rem">
                Započinjemo! Pripremi se!
            </Typography>
            <CircularProgress
                sx={{
                    marginTop: "24px",
                }}
            />
        </Box>
    );
}
