import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";

import { Context } from "../../context";
import { PlayerView } from "./PlayerView";
import { useRecoilValue } from "recoil";

export function AdminPanel() {
    const { recoil, api } = useContext(Context);

    const players = useRecoilValue(recoil.players);

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} margin="48px 0 0 0" display="flex" flexDirection="column">
                <Typography margin="0 64px" fontWeight="700" fontSize="2rem">
                    IGRA
                </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={8} display="flex" gap="8px">
                <Box margin="16px 0 0 0">
                    <Button
                        size="large"
                        variant="contained"
                        disableElevation
                        disabled={players.length === 0}
                        onClick={() => api.startGameAsync()}
                    >
                        Započni igru
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={12} margin="48px 0 0 0">
                <Typography margin="0 64px" fontWeight="700" fontSize="2rem">
                    IGRAČI ({players.length})
                </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Box margin="16px 0 0 0" display="flex" gap="42px">
                    {players.map((p) => (
                        <PlayerView player={p} key={p.connectionId} />
                    ))}
                </Box>
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
}
