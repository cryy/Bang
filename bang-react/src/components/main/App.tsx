import { CssBaseline, ThemeProvider } from "@material-ui/core";

import { AppContainer } from "./AppContainer";
import { Context } from "../../context";
import React from "react";

export function App() {
    const ctx = React.useContext(Context);

    return (
        <ThemeProvider theme={ctx.themeService.theme}>
            <CssBaseline />
            <AppContainer />
        </ThemeProvider>
    );
}
