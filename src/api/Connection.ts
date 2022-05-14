import * as vscode from 'vscode';
import * as rm from 'typed-rest-client/RestClient';

import { ConnectionStatus } from './Common';
import { extUserAgent } from './Common';

const backend: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');
const judge: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('judgeServer');
const endpoint = '/connect';

export class ConnectionChecker {
    private _status: boolean;
    private _time: Date;
    private _client: rm.RestClient = new rm.RestClient(extUserAgent, backend);

    constructor () {
        this._status = false;
        this._time = new Date();
    }

    public async check() {
        // try {
        // let res: rm.IRestResponse<ConnectionStatus> = await this._client.get<ConnectionStatus>(endpoint);
        // if (res.result !== null && res.result.status) {
        //     this._status = true;
        //     this._time = res.result.obj;
        // } else {
        //     this._status = false;
        //     this._time = new Date();
        // }

        await this._client.get<ConnectionStatus>(endpoint).then(res => {
            if (res.result !== null && res.result.status) {
                this._status = true;
                this._time = res.result.obj;
            } else {
                this._status = false;
                this._time = new Date();
            }
        }).catch(err => {
            this._status = false;
            this._time = new Date();
            console.log(err);
        });
        // } catch(err) {
        //     this._status = false;
        //     this._time = new Date();
        //     console.log(err);
        //     return;
        // }
    }

    public get status(): boolean {
        return this._status;
    }

    public get time(): Date {
        return this._time;
    }
}
