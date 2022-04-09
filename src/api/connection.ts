import fetch from 'node-fetch';
import * as vscode from 'vscode';
import * as rm from 'typed-rest-client/RestClient';

import { ConnectionStatus } from './types';

const endpoint = '/connect';
const server = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');


export class ConnectionChecker {
    private _status: boolean;
    private _time: Date;
    private _client: rm.RestClient = new rm.RestClient('xoj-playground', 'http://oj.k-nn.tech:8081');

    constructor () {
        this._status = false;
        this._time = new Date();
    }

    public async check() {
        try {
            let res: rm.IRestResponse<ConnectionStatus> = await this._client.get<ConnectionStatus>(endpoint);
            if (res.result?.status) {
                this._status = true;
                this._time = res.result.obj;
            }
        } catch(err) {
            this._status = false;
            this._time = new Date();
            return;
        }
    }

    public get status(): boolean {
        return this._status;
    }

    public get time(): Date {
        return this._time;
    }
}
