import { APIService, RecoilService, ThemeService } from "./services";
import { BangContext, Context } from "./context";

import { App } from "./components";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { default as _RecoilOutside } from "recoil-outside";
import reportWebVitals from "./reportWebVitals";

const ctx: BangContext = {
    theme: new ThemeService(),
    recoil: new RecoilService(),
    api: new APIService(),
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
