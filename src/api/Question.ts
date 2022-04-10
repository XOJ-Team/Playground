import * as vscode from 'vscode';
import * as rm from 'typed-rest-client/RestClient';

import { QuestionObject } from "./Types";

const server: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');
const endpoint = '/question/';

export class Question {
    private _id: string;
    private _title: string;
    private _level: number;
    private _desc: string;
    private _client: rm.RestClient = new rm.RestClient('xoj-playground', server);

    constructor(id: string) {
        this._id = id;
        this._title = 'null';
        this._level = 0;
        this._desc = 'null';
    }

    public async get() {
        try {
            let res: rm.IRestResponse<QuestionObject> = await this._client.get<QuestionObject>(endpoint);
            
        } catch(err) {
            
        }
    }
}
