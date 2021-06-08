import { RecoilService, ThemeService } from "../services";

import React from "react";

export interface BangContext {
    themeService: ThemeService;
    recoilService: RecoilService;
}

export const Context = React.createContext<BangContext | null>(null) as React.Context<BangContext>;