import * as vscode from 'vscode';
import * as rm from 'typed-rest-client';

const server: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');
const endpoint = '/judge';

export class JudgeServer {
    // TODO(skk): replace with actual results from server, this is debug only.
    private _languageCapability: string[] = ['c', 'cpp', 'java', 'python', 'javascript'];
    // private _languageCapability: string[] = [''];
    private _client: rm.RestClient = new rm.RestClient('xoj-playground', server);

    constructor() {
        this.updateLanguageCapability();
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
