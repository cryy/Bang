import { RecoilState, atom } from "recoil";

export class RecoilService {

    private _self: RecoilState<Nullable<number>>

    constructor() {
        this._self = atom({
            key: "self",
            default: null as Nullable<number>
        });
    }

    get self() {
        return this._self;
    }
}