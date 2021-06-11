import { AnswerResult, FinishResult, Player, Question } from "../api";
import { RecoilState, RecoilValueReadOnly, atom, selector } from "recoil";

export class RecoilService {
    private _loggedIn: RecoilState<boolean>;
    private _isAdmin: RecoilState<boolean>;

    private _question: RecoilState<Nullable<Question>>;
    private _gameStarted: RecoilValueReadOnly<boolean>;
    private _gameIsStarting: RecoilState<boolean>;
    private _questionReady: RecoilState<boolean>;
    private _stopVote: RecoilState<boolean>;

    private _answerResult: RecoilState<Nullable<AnswerResult>>;


    private _points: RecoilState<number>;
    private _streak: RecoilState<number>;
    private _name: RecoilState<Nullable<string>>;


    private _playersWithAdmin: RecoilState<Player[]>;
    private _players: RecoilValueReadOnly<Player[]>;

    private _finish: RecoilState<Nullable<FinishResult>>;

    constructor() {
        this._loggedIn = atom({
            key: "loggedIn",
            default: false as boolean,
        });

        this._isAdmin = atom({
            key: "isAdmin",
            default: false as boolean,
        });

        this._answerResult = atom({
            key: "answerResult",
            default: null as Nullable<AnswerResult>
        });

        this._stopVote = atom({
            key: "stopVote",
            default: false as boolean
        });
        this._question = atom({
            key: "question",
            default: null as Nullable<Question>
        });
        this._gameStarted = selector({
            key: "gameStarted",
            get: ({ get }) => {
                const qReady = get(this._questionReady);

                return qReady;
            },
        });
        this._gameIsStarting = atom({
            key: "gameIsStarting",
            default: false as boolean
        });
        this._questionReady = atom({
            key: "questionReady",
            default: false as boolean
        });

        this._points = atom({
            key: "points",
            default: 0
        });
        this._streak = atom({
            key: "streak",
            default: 0
        });
        this._name = atom({
            key: "name",
            default: null as Nullable<string>
        });

        this._playersWithAdmin = atom({
            key: "playersWithAdmin",
            default: [] as Player[],
        });
        this._players = selector({
            key: "players",
            get: ({ get }) => {
                const withAdmin = get(this._playersWithAdmin);

                return withAdmin.filter((x) => !x.isAdmin);
            },
        });

        this._finish = atom({
            key: "finishResult",
            default: null as Nullable<FinishResult>
        });
    }

    get loggedIn() {
        return this._loggedIn;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    get gameStarted() {
        return this._gameStarted;
    }

    get gameIsStarting() {
        return this._gameIsStarting;
    }

    get playersWithAdmin() {
        return this._playersWithAdmin;
    }

    get players() {
        return this._players;
    }

    get question() {
        return this._question;
    }

    get questionIsReady() {
        return this._questionReady;
    }

    get streak() {
        return this._streak;
    }

    get points() {
        return this._points;
    }

    get name() {
        return this._name;
    }

    get stopVote() {
        return this._stopVote;
    }

    get answerResult() {
        return this._answerResult;
    }

    get finish() {
        return this._finish;
    }
}
