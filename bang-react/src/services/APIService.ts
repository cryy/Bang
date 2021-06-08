import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

import { Message } from "../api/Message";

export class APIService {
    private _connection: HubConnection;

    constructor() {
        this._connection = new HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl("/api/ws")
            .build();
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

    public loginAsync(email: string, password: string) {
        return this.invoke("Login", email, password);
    }
}
