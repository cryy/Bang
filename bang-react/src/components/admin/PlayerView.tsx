import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";

import { Context } from "../../context";
import { Player } from "../../api";

export interface PlayerViewProps {
    key?: string;
    player: Player;
}

export function PlayerView({ player, key }: PlayerViewProps) {

    const { api } = useContext(Context);

    return (
        <Paper variant="outlined">
            <Grid container spacing={0} width="128px" height="128px">
                <Grid
                    item
                    xs={12}
                    height="60%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                >
                    <Typography fontWeight="600">{player.name}</Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    height="40%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        disableElevation
                        onClick={() => api.kickAsync(player.connectionId)}
                    >
                        Izbaci
                    </Button>
                </Grid>
            </Grid>
        </Paper>
        
    );
}
