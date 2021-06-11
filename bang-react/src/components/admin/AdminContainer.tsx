import React, { useContext } from "react";

import { AdminPanel } from "./AdminPanel";
import { AdminQuestionView } from "./AdminQuestionView";
import { Context } from "../../context";
import { Starting } from "./Starting";
import { useRecoilValue } from "recoil";

export function AdminContainer() {
    const { recoil } = useContext(Context);

    const gameStarted = useRecoilValue(recoil.gameStarted);
    const gameIsStarting = useRecoilValue(recoil.gameIsStarting);


    return <>{gameStarted ? <AdminQuestionView /> : (gameIsStarting ? <Starting /> : <AdminPanel />)}</>;
}
