import { globalState } from "./GlobalInstance";

export class Session {
    private _sessionId: string | null;
    private _questionId?: String;
    private _languageId?: Number;

    constructor() {
        this._sessionId = 'SESSION';
        this._questionId = '';
        this._languageId = 54;
    }

    public update(): void {
        this._sessionId = globalState.sessionId;
        this._languageId = globalState.langId;
        this._questionId = globalState.questionId;
    }
}