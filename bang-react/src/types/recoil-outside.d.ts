declare module 'recoil-outside' {
    import { RecoilValue } from 'recoil';
    export function promiseSetRecoil<T>(recoilObj: RecoilValue<T>, value: T): Promise<RecoilValue<T>>;
    export function promiseGetRecoil<T>(recoilObj: RecoilValue<T>): Promise<T>;
}