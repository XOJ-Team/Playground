import * as vscode from 'vscode';
import * as rm from 'typed-rest-client/RestClient';

import { QuestionObject } from "./Types";

const server: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');
const endpoint = '/question/';

export class Question {
    private _id: string;
    private _title?: string;
    private _level?: number;
    private _desc?: string;
    private _memLimit?: number;
    private _timeLimit?: number;
    private _client: rm.RestClient = new rm.RestClient('xoj-playground', server);

    constructor(id: string) {
        this._id = id;
        this._title = 'null';
        this._level = 0;
        this._desc = 'null';
    }

    public async get() {
        try {
            let res: rm.IRestResponse<QuestionObject> = await this._client.get<QuestionObject>(endpoint + this._id);
            this._title = res.result?.obj.name;
            this._desc = res.result?.obj.content;
            this._memLimit = res.result?.obj.memoryLimit;
            this._timeLimit = res.result?.obj.timeLimit;    
        } catch(err) {
            console.log(err);
        }
    }

    public get title(): string | undefined {
        return this._title;
    }

    public get desc(): string | undefined {
        return this._desc;
    }
    
    public get memLimit(): number | undefined {
        return this._memLimit;
    }

    public get timeLimit(): number | undefined {
        return this._timeLimit;
    }

}
