import { Box, Grid, Typography } from "@material-ui/core";

import React from "react";

export function Auth() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Grid container spacing={0}>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Grid container spacing={0}>
                        <Typography>Ulogiraj se...</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={3} />
            </Grid>
        </Box>
    );
}
