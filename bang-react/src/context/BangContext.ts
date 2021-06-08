import { APIService, RecoilService, ThemeService } from "../services";

import React from "react";

export interface BangContext {
    theme: ThemeService;
    recoil: RecoilService;
    api: APIService;
}

export const Context = React.createContext<BangContext | null>(null) as React.Context<BangContext>;