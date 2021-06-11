import { Message } from "./Message";
import { Player } from "../entities";

export interface AdminLoginMessage extends Message {
    players: Player[];
}