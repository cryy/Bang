import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import React, { useContext } from "react";

import { Context } from "../../context";
import { Player } from "../../api";
import { useRecoilValue } from "recoil";

export function AdminFinishView() {
    const { recoil } = useContext(Context);

    const players = useRecoilValue(recoil.players);

    return (
        <Grid container spacing={0}>
            <Grid
                item
                xs={12}
                margin="48px 0 0 0"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
            >
                <Typography margin="0 64px" fontWeight="600" fontSize="2rem">
                    Igra je gotova! Hvala na igranju!
                </Typography>
            </Grid>
            <Grid item xs={12} margin="48px 0 0 0">
                <Typography margin="0 64px" fontWeight="700" fontSize="2rem">
                    IGRAČI ({players.length})
                </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Box
                    margin="16px 0 0 0"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        "& > * > * > * > * > *": {
                            fontSize: "0.95rem",
                        },
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table
                            sx={{
                                minWidth: 650,
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mjesto</TableCell>
                                    <TableCell>Ime i prezime</TableCell>
                                    <TableCell>Bodovi</TableCell>
                                    <TableCell>Streak</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[...players]
                                    .sort((a, b) => b.points - a.points)
                                    .map((p, i) => (
                                        <TableRow key={p.connectionId}>
                                            <TableCell>{i + 1}.</TableCell>
                                            <TableCell>{p.name}</TableCell>
                                            <TableCell>{p.points}</TableCell>
                                            <TableCell>{p.streak}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
}
