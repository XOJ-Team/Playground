/* eslint-disable @typescript-eslint/naming-convention */

import * as vscode from 'vscode';
import * as rm from 'typed-rest-client';
import { IHeaders } from 'typed-rest-client/Interfaces';

import { extUserAgent } from './Common';
import { Judge0SubmissionRequest } from './Common';
import { Judge0SubmissionResponse } from './Common';
import { Judge0LookupResponse } from './Common';
import { globalState } from './Common';

const server: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('judgeServer');

const rapidApiOptions: string = '?base64_encoded=true';
const rapidApiHeaders: IHeaders = {
    'Cookie': 'SESSION='+globalState.sessionId
};

const endpointSubmit = '/submit/';
const endpointRun = '/run/';
export class JudgeServer {
    private _languageCapability: string[] = ['c', 'cpp', 'java', 'python', 'javascript'];
    private _client: rm.RestClient = new rm.RestClient(extUserAgent, server + endpointSubmit + rapidApiOptions, [], { headers: rapidApiHeaders });
    private _token?: string = '';
    private _body: Judge0SubmissionRequest = {
        source_code: '',
        language_id: 0,
        stdin: 'd29ybGQK',
        expected_output: 'aGVsbG8sIHdvcmxkCg=='
    };

    constructor() {
        console.log('API URL: ' + extUserAgent, server + endpointSubmit + rapidApiOptions);
    }

    public async submit(): Promise<number> {
        this._body.source_code = Buffer.from(globalState.code, 'binary').toString('base64');
        this._body.language_id = globalState.langId;
        let submission: rm.IRestResponse<Judge0SubmissionResponse> = await this._client.create<Judge0SubmissionResponse>(endpointSubmit + rapidApiOptions, this._body);
        this._token = submission.result?.token;

        return submission.statusCode;
    }

    public async runRemote(): Promise<number> {
        this._body.source_code = Buffer.from(globalState.code, 'binary').toString('base64');
        this._body.language_id = globalState.langId;
        let submission: rm.IRestResponse<Judge0SubmissionResponse> = await this._client.create<Judge0SubmissionResponse>(endpointSubmit + rapidApiOptions, this._body);
        this._token = submission.result?.token;
        return submission.statusCode;
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
