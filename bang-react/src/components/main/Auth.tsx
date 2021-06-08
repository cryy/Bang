import { Box, Grid, Link, TextField, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";

import { Context } from "../../context";
import { LoadingButton } from "@material-ui/lab"

export function Auth() {
    const { api } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const canSubmit = [email, password].every((x) => x && x.length > 3);


    const submit = async () => {
        setLoading(true);
        
        try {
            await api.startAsync();
            await api.loginAsync(email, password);
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Grid container spacing={0}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <Box width="230px" display="flex" flexDirection="column" gap="16px">
                                <TextField
                                    label="AAI@EduHr E-pošta"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                                <TextField
                                    label="AAI@EduHr lozinka"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    disabled={!canSubmit}
                                    disableElevation
                                    onClick={() => submit()}
                                >
                                    Prijavi se
                                </LoadingButton>
                                <Link textAlign="right" fontWeight="bold">
                                    ADMIN LOGIN
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </Box>
    );
}
