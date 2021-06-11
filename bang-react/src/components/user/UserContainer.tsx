import React, { useContext } from "react";

import { Context } from "../../context";
import { GameIsStarting } from "./GameIsStarting";
import { GameNotStarted } from "./GameNotStarted";
import { UserQuestionView } from ".";
import { useRecoilValue } from "recoil";

export function UserContainer() {
    const { recoil } = useContext(Context);

    const gameStarted = useRecoilValue(recoil.gameStarted);
    const gameIsStarting = useRecoilValue(recoil.gameIsStarting);

    return <>{gameStarted ? <UserQuestionView /> : gameIsStarting ? <GameIsStarting /> : <GameNotStarted />}</>;
}
