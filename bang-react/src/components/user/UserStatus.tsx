import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core";

import { Context } from "../../context";
import React from "react";
import { useContext } from "react";
import { useRecoilValue } from "recoil";

export function UserStatus() {
    const { recoil } = useContext(Context);

    const name = useRecoilValue(recoil.name);
    const points = useRecoilValue(recoil.points);
    const streak = useRecoilValue(recoil.streak);

    return (
        <>
            <Paper sx={{ position: "fixed", top: 0, left: 0, right: 0 }} elevation={3}>
                <Grid container spacing={0} height="64px">
                    <Grid item xs={1} />
                    <Grid item xs={3} display="flex" alignItems="center">
                        <Typography fontWeight="600" fontSize="1.15rem">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={3} display="flex" alignItems="center" justifyContent="center">
                        <Typography fontWeight="600" textAlign="right" fontSize="1.15rem">
                            Bodovi:{" "}
                            <Typography component="span" fontWeight="500" fontSize="1.15rem">
                                {points}
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </Paper>

            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "primary" }}
                elevation={3}
            >
                <Grid container spacing={0} height="64px">
                    <Grid item xs={1} />
                    <Grid item xs={3} display="flex" alignItems="center">
                        <Typography fontWeight="600" fontSize="1.15rem">
                            Streak:{" "}
                            <Typography component="span" fontWeight="500" fontSize="1.15rem">
                                {streak}
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={8} />
                </Grid>
            </Paper>
        </>
    );
}
