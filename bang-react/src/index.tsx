import { BangContext, Context } from "./context";
import { RecoilService, ThemeService } from "./services";

import { App } from "./components";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { default as _RecoilOutside } from "recoil-outside";
import reportWebVitals from "./reportWebVitals";

const ctx: BangContext = {
    themeService: new ThemeService(),
    recoilService: new RecoilService(),
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
