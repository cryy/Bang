import { Button, Grid, Paper, Tooltip, Typography } from "@material-ui/core";
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
            <Grid container spacing={0} width="146px" height="146px">
                <Grid
                    item
                    xs={12}
                    height="60%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                >
                    <Tooltip title={player.email} arrow>
                        <Typography fontWeight="600">{player.name}</Typography>
                    </Tooltip>
                </Grid>
                <Grid
                    item
                    xs={12}
                    height="40%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid container spacing={0}>
                        <Grid item xs={1} />
                        <Grid
                            item
                            xs={4}
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
                        <Grid item xs={2} />
                        <Grid
                            item
                            xs={4}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                variant="contained"
                                size="small"
                                color="secondary"
                                disableElevation
                                onClick={() => api.banAsync(player.connectionId)}
                            >
                                Banaj
                            </Button>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
