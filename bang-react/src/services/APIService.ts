import { AdminLoginMessage, AnswerResult, FinishResult, Message, Player, Question, QuestionEndResult } from "../api";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { promiseGetRecoil, promiseSetRecoil } from "recoil-outside";

import { RecoilService } from "./RecoilService";
import toast from "react-hot-toast";

export class APIService {
    private _connection: HubConnection;
    private _recoil: RecoilService;

    constructor(recoil: RecoilService) {
        this._recoil = recoil;
        this._connection = new HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl("/api/ws")
            .build();

        this.hook();
    }

    private hook() {

        this._connection.onclose(async (err) => {
            promiseSetRecoil(this._recoil.isAdmin, false);
            promiseSetRecoil(this._recoil.loggedIn, false);

            toast.error("Izbačen/a si sa veze.", {
                position: "bottom-left"
            });
        });

        this._connection.on("UserLogout", async (id: string) => {
            const players = await promiseGetRecoil(this._recoil.playersWithAdmin);
            promiseSetRecoil(this._recoil.playersWithAdmin, players.filter(p => p.connectionId !== id));
        });
        this._connection.on("UserLogin", async (player: Player) => {
            const players = await promiseGetRecoil(this._recoil.playersWithAdmin);
            promiseSetRecoil(this._recoil.playersWithAdmin, [player, ...players]);
        });
        this._connection.on("Start", () => {
            promiseSetRecoil(this._recoil.gameIsStarting, true);
            setTimeout(() => {
                promiseSetRecoil(this._recoil.gameIsStarting, false);
            }, 10000);
        });
        this._connection.on("Question", (question: Question) => {
            promiseSetRecoil(this._recoil.question, question);
            promiseSetRecoil(this._recoil.answerResult, null);
        });
        this._connection.on("QuestionReady", () => {
            promiseSetRecoil(this._recoil.questionIsReady, true);
            promiseSetRecoil(this._recoil.answerResult, null);
        });
        this._connection.on("PlayersUpdate", (result: QuestionEndResult) => {
            promiseSetRecoil(this._recoil.playersWithAdmin, result.players);
        })
        
        this._connection.on("AnswerResult", (result: AnswerResult) => {
            promiseSetRecoil(this._recoil.answerResult, result);

            promiseSetRecoil(this._recoil.points, result.points);
            promiseSetRecoil(this._recoil.streak, result.streak);

            promiseSetRecoil(this._recoil.question, null);
            promiseSetRecoil(this._recoil.stopVote, false);

        });
        this._connection.on("StopVote", () => {
            promiseSetRecoil(this._recoil.stopVote, true);
        });
        this._connection.on("QuizFinish", (result: FinishResult) => {
            promiseSetRecoil(this._recoil.finish, result);
        });
    }

    private connected() {
        return this._connection.state === HubConnectionState.Connected;
    }

    private async invoke<T extends Message = Message>(method: string, ...args: any[]) {
        const message = await this._connection.invoke<Message>(method, ...args);
        console.log(message);

        if (message.errorMessage) throw new Error(message.errorMessage);

        return message as T;
    }

    public startAsync() {
        if (this.connected()) return;

        return this._connection.start();
    }

    public loginAsync(email: string, detail: string) {
        return this.invoke("LoginAsync", email, detail);
    }

    public adminLoginAsync(key: string) {
        return this.invoke<AdminLoginMessage>("AdminLoginAsync", key);
    }

    public startGameAsync() {
        return this.invoke("StartAsync");
    }

    public answerAsync(id: string) {
        return this.invoke("Answer", id);
    }

    public kickAsync(id: string) {
        return this.invoke("KickAsync", id);
    }

    public nextAsync() {
        return this.invoke("NextAsync");
    }

    public banAsync(id: string) {
        return this.invoke("BanAsync", id);
    }

    get connection() {
        return this._connection;
    }
}
