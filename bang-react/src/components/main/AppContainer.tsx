import React, { useContext } from "react";

import { Auth } from "./Auth";
import { Context } from "../../context";
import { useRecoilValue } from "recoil";

export function AppContainer() {
    const { recoil } = useContext(Context);
    const self = useRecoilValue(recoil.self);

    return self == null ? <Auth /> : <div>hello</div>;
}
