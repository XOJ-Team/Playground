export class Session {
    private _sessionId: string;

    constructor() {
        this._sessionId = 'SESSION';
    }

    public get sessionId(): string {
        return this._sessionId;
    }
}