import React, { useContext } from "react";

import { Auth } from "./Auth";
import { Context } from "../../context";
import { useRecoilValue } from "recoil";

export function AppContainer() {
    const { recoilService: state } = useContext(Context);
    const self = useRecoilValue(state.self);

    return self == null ? <Auth /> : <div>hello</div>;
}
