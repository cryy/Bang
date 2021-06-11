import React, { useContext } from "react";

import { AdminContainer } from "../admin";
import { Auth } from "./Auth";
import { Context } from "../../context";
import { Toaster } from "react-hot-toast";
import { UserContainer } from "../user";
import { useRecoilValue } from "recoil";

export function AppContainer() {
    const { recoil } = useContext(Context);

    const loggedIn = useRecoilValue(recoil.loggedIn);
    const isAdmin = useRecoilValue(recoil.isAdmin);

    return (
        <div>
            {!loggedIn ? <Auth /> : isAdmin ? <AdminContainer /> : <UserContainer />}
            <Toaster />
        </div>
    );
}
