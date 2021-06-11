import { Box, Grid, Link, TextField, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";

import { Context } from "../../context";
import { LoadingButton } from "@material-ui/lab";
import toast from "react-hot-toast";
import { use100vh } from "react-div-100vh";
import { useSetRecoilState } from "recoil";

export function Auth() {
    const { api, recoil } = useContext(Context);

    const h = use100vh();

    const [email, setEmail] = useState("");
    const [detail, setDetail] = useState("");
    const [loading, setLoading] = useState(false);
    const [adminLogin, setAdminLogin] = useState(false);
    const [key, setKey] = useState("");

    const setPlayers = useSetRecoilState(recoil.playersWithAdmin);
    const setIsAdmin = useSetRecoilState(recoil.isAdmin);
    const setIsLoggedIn = useSetRecoilState(recoil.loggedIn);
    const setName = useSetRecoilState(recoil.name);

    const requirementArray = adminLogin ? [key] : [email, detail];
    const canSubmit = requirementArray.every((x) => x && x.length > 3);

    const submit = async () => {
        setLoading(true);

        try {
            await api.startAsync();

            if (adminLogin)
                await api.adminLoginAsync(key).then((m) => {
                    setName("ADMIN");
                    setPlayers(m.players);
                    setIsAdmin(true);
                });
            else await api.loginAsync(email, detail).then(() => {
                setName(detail);
            });

            setIsLoggedIn(true);
        } catch (err) {
            setLoading(false);
            toast.error(err.toString(), {
                position: "bottom-left",
            });
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
                height: h as number,
            }}
        >
            <Grid container spacing={0}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <Box width="230px" display="flex" flexDirection="column" gap="16px">
                                {adminLogin ? (
                                    <>
                                        <TextField
                                            label="Ključ"
                                            type="password"
                                            value={key}
                                            onChange={(e) => setKey(e.target.value)}
                                            disabled={loading}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <TextField
                                            label="AAI@EduHr E-pošta"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                        />
                                        <TextField
                                            label="Ime i prezime"
                                            value={detail}
                                            onChange={(e) => setDetail(e.target.value)}
                                            disabled={loading}
                                        />
                                    </>
                                )}
                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    disabled={!canSubmit}
                                    disableElevation
                                    onClick={() => submit()}
                                >
                                    Prijavi se
                                </LoadingButton>

                                <Link
                                    textAlign="right"
                                    fontWeight="bold"
                                    sx={{
                                        cursor: "pointer",
                                        color: loading ? "text.disabled" : undefined,
                                    }}
                                    onClick={() => (loading ? "" : setAdminLogin(!adminLogin))}
                                >
                                    {adminLogin ? "KORISNIK LOGIN" : "ADMIN LOGIN"}
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
