import { Box, Typography } from "@material-ui/core";

import React from "react";

export function QuestionWait() {
    return (
        <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
            <Typography textAlign="center" fontWeight="600" fontSize="2.1rem">
                Pročitaj pitanje na ekranu!
            </Typography>
        </Box>
    );
}
