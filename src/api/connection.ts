import fetch from 'node-fetch';
import * as vscode from 'vscode';

import { ApiConnection } from './types';

const endpoint = '/connect';
const server = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');

export async function checkConnection(): Promise<ApiConnection> {
    fetch(server + endpoint)
    .then(
        res => res.json(),
        err => {
            console.log(err);
            return {
                status: false,
                time: new Date(),
            };
        }
    )
    .then(
        res => {
            return {
                status: true,
                time: new Date(res.time),
            };
        }
    );
}