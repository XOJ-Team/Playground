/* eslint-disable @typescript-eslint/naming-convention */

import * as vscode from 'vscode';
import * as rm from 'typed-rest-client';
import { IHeaders } from 'typed-rest-client/Interfaces';

import { extUserAgent } from './Common';
import { Judge0SubmissionRequest } from './Common';
import { Judge0SubmissionResponse } from './Common';
import { Judge0LookupResponse } from './Common';
import { globalState } from './Common';

const server: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');

// TODO: Remove RapidAPIRef
// const rapidApiOptions: string = '?base64_encoded=true';
const rapidApiOptions: string = '';
const endpointSubmit = '/judge/submit/';
const endpointRun = '/judge/run/';

export class JudgeServer {
    private rapidApiHeaders: IHeaders = {
        'Cookie': 'SESSION=' + globalState.sessionId
    };
    private _languageCapability: string[] = ['c', 'cpp', 'java', 'python', 'javascript'];
    private _client: rm.RestClient = new rm.RestClient(extUserAgent, server, [], { headers: this.rapidApiHeaders });
    private _token?: string = '';
    private _body: Judge0SubmissionRequest = {
        expected_output: '',
        language_id: 0,
        question_id: 0,
        source_code: '',
        stdin: 'd29ybGQK',
    };

    constructor() {
        console.log('API URL: ' + extUserAgent, server + endpointSubmit + rapidApiOptions);
    }

    public async submit(): Promise<rm.IRestResponse<Judge0SubmissionResponse>> {
        this._body.source_code = Buffer.from(globalState.code, 'binary').toString('base64');
        this._body.language_id = globalState.langId;
        this._body.question_id = Number(globalState.questionId);
        let submission: rm.IRestResponse<Judge0SubmissionResponse> = await this._client.create<Judge0SubmissionResponse>(endpointSubmit + rapidApiOptions, this._body);
        console.log("BODY"+this._body);
        
        this._token = submission.result?.token;
        return submission;
    }

    public async runRemote(): Promise<number> {
        this._body.source_code = Buffer.from(globalState.code, 'binary').toString('base64');
        this._body.stdin = Buffer.from(globalState.stdin, 'binary').toString('base64');
        this._body.language_id = globalState.langId;
        this._body.question_id = Number(globalState.questionId);

        let submission: rm.IRestResponse<Judge0SubmissionResponse> = await this._client.create<Judge0SubmissionResponse>(endpointRun + rapidApiOptions, this._body);
        console.log(submission.result);
        return submission.statusCode;
    }

    public refreshJudgeClient(){
        this.rapidApiHeaders= {
            'Cookie': 'SESSION=' + globalState.sessionId
        };
        this._client = new rm.RestClient(extUserAgent, server, [], { headers: this.rapidApiHeaders });
        console.log('[INFO] Judge client refreshed. New Cookie: '+this.rapidApiHeaders.Cookie);
        
    }

    public async getResult() {
        while (true) {
            let res: rm.IRestResponse<Judge0LookupResponse> = await this._client.get<Judge0LookupResponse>(endpointSubmit + this._token + rapidApiOptions);
            if (res.statusCode === 200) {
                console.log(res.result);
                return res.result;
            }
        }
    }
}
