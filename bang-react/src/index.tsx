import { APIService, RecoilService, ThemeService } from "./services";
import { BangContext, Context } from "./context";

import { App } from "./components";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { default as _RecoilOutside } from "recoil-outside";
import reportWebVitals from "./reportWebVitals";

const theme = new ThemeService();
const recoil = new RecoilService();
const api = new APIService(recoil);

const ctx: BangContext = {
    theme: theme,
    recoil: recoil,
    api: api
};

const RecoilOutside = _RecoilOutside as any;

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={ctx}>
            <RecoilRoot>
                <RecoilOutside />
                <App />
            </RecoilRoot>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// reportWebVitals(console.log);
