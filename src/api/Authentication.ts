import * as vscode from 'vscode';
import * as rm from 'typed-rest-client/RestClient';

import { extUserAgent } from './Common';

const server: string | undefined = vscode.workspace.getConfiguration('xoj-playground').get('targetServer');
const endpoint = '/login';

export class AuthenticationProvider {
    constructor() {

    }

    public async signIn() {
        
    }
}