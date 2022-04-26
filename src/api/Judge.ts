import * as vscode from 'vscode';
import * as rm from 'typed-rest-client';
import { IHeaders } from 'typed-rest-client/Interfaces';

import { extUserAgent } from './Types';
import { Judge0SubmissionRequest } from './Types';
import { Judge0SubmissionResponse } from './Types';
import { Judge0LookupResponse } from './Types';

const server: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('judgeServer');

const rapidApiOptions: string = '?base64_encoded=true';
const rapidApiHeaders: IHeaders = {
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    'X-RapidAPI-Key': '70bf6240d4msh1b624cfac8134adp1c9a15jsn24e93331d79e'
};

const endpoint = '/submissions/';

const testBody: Judge0SubmissionRequest = {
    source_code: "I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=",
    language_id: 52,
    stdin: "d29ybGQK",
    expected_output: "aGVsbG8sIHdvcmxkCg=="
};

export class JudgeServer {
    private _languageCapability: string[] = ['c', 'cpp', 'java', 'python', 'javascript'];
    private _client: rm.RestClient = new rm.RestClient(extUserAgent, server + endpoint + rapidApiOptions, [], { headers: rapidApiHeaders });
    private _token?: string = '';

    constructor() {
        console.log('API URL: ' + extUserAgent, server + endpoint + rapidApiOptions);
    }

    public async submit() {
        let res: rm.IRestResponse<Judge0SubmissionResponse> = await this._client.create<Judge0SubmissionResponse>(endpoint + rapidApiOptions, testBody);
        this._token = res.result?.token;
        console.log(res.result);
    }

    public async getResult() {
        let res: rm.IRestResponse<Judge0LookupResponse> = await this._client.get<Judge0LookupResponse>(endpoint + this._token + rapidApiOptions);
        console.log(res.result);
    }

    private async updateLanguageCapability() {
        // TODO(skk): impl the server
        // let res: rm.IRestResponse<string[]> = await this._client.get<string[]>(endpoint + '/language');
        // this._languageCapability = res.result?.lang;
    }

    public get languageCapability(): string[] {
        return this._languageCapability;
    }

}
