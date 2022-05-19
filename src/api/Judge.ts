/* eslint-disable @typescript-eslint/naming-convention */

import * as vscode from 'vscode';
import * as rm from 'typed-rest-client';
import { IHeaders } from 'typed-rest-client/Interfaces';

import { extUserAgent } from './Common';
import { Judge0SubmissionRequest } from './Common';
import { JudgeServerWrapper } from '../api/Common';
import { Judge0Response } from '../api/Common';
import { globalState } from './Common';

const server: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');

// const rapidApiOptions: string = '?base64_encoded=true';
const rapidApiOptions: string = '';
const endpointSubmit = '/judge/submit/';
const endpointRun = '/judge/run/';

export class JudgeServer {
    private rapidApiHeaders: IHeaders = {
        'Cookie': 'SESSION=' + globalState.sessionId
    };
    private _client: rm.RestClient = new rm.RestClient(extUserAgent, server, [], { headers: this.rapidApiHeaders });
    private _token?: string = '';
    private _body: Judge0SubmissionRequest = {
        language_id: 0,
        question_id: 0,
        source_code: '',
        stdin: '',
    };

    constructor() {
        console.log('API URL: ' + extUserAgent, server + endpointSubmit + rapidApiOptions);
    }

    public async submit(): Promise<rm.IRestResponse<JudgeServerWrapper>> {
        this._body.source_code = Buffer.from(globalState.code, 'binary').toString('base64');
        this._body.language_id = globalState.langId;
        this._body.question_id = Number(globalState.questionId);
        let submission: rm.IRestResponse<JudgeServerWrapper> = await this._client.create<JudgeServerWrapper>(endpointSubmit + rapidApiOptions, this._body);
        return submission;
    }

    public async run(): Promise<rm.IRestResponse<JudgeServerWrapper>> {
        this._body.source_code = Buffer.from(globalState.code, 'binary').toString('base64');
        this._body.stdin = Buffer.from(globalState.stdin, 'binary').toString('base64');
        this._body.language_id = globalState.langId;
        this._body.question_id = Number(globalState.questionId);
        let submission: rm.IRestResponse<JudgeServerWrapper> = await this._client.create<JudgeServerWrapper>(endpointRun + rapidApiOptions, this._body);
        return submission;
    }

    public refreshJudgeClient(){
        this.rapidApiHeaders= {
            'Cookie': 'SESSION=' + globalState.sessionId
        };
        this._client = new rm.RestClient(extUserAgent, server, [], { headers: this.rapidApiHeaders });
        console.log('[INFO] Judge client refreshed. New Cookie: '+this.rapidApiHeaders.Cookie);
    }

    // Deprecated, why so why so?
    // public async getResult() {
    //     while (true) {
    //         let res: rm.IRestResponse<Judge0LookupResponse> = await this._client.get<Judge0LookupResponse>(endpointSubmit + this._token + rapidApiOptions);
    //         if (res.statusCode === 200) {
    //             console.log(res.result);
    //             return res.result;
    //         }
    //     }
    // }
}
