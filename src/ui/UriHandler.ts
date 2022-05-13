import * as vscode from 'vscode';

import { WebSession } from '../api/Common';
import { globalState } from '../api/Common';
import { DescriptionView } from './DescriptionView';
import { judgeServerInstance } from '../api/GlobalInstance';
class FrontendUriHandler implements vscode.UriHandler {
    handleUri(uri: vscode.Uri): vscode.ProviderResult<void> {
        if (uri.query) {
            const url = new URL(uri.toString(true));
            const sessionIdRaw = url.searchParams.get('sessionId');
            if (sessionIdRaw !== null) {
                // globalState.sessionId = Buffer.from(sessionIdRaw, 'base64').toString('binary');
                globalState.sessionId = sessionIdRaw;
            }
            globalState.questionId = url.searchParams.get('questionId') || '';
            judgeServerInstance.refreshJudgeClient();
            vscode.commands.executeCommand('xoj-playground.refresh');
        }
    }
}

export class WebUriHandler {
    private _handler: vscode.UriHandler = new FrontendUriHandler();
    private _disposable: vscode.Disposable;
    private _command: string = 'xoj-playground.start';

    constructor(private readonly _extensionContext: vscode.ExtensionContext) {
        this._disposable = vscode.commands.registerCommand(this._command, async () => register, _extensionContext);
        register(_extensionContext);
        _extensionContext.subscriptions.push(this._disposable);
    }
}

// TODO(skk): figure out why so why so
async function register(_context: vscode.ExtensionContext) {
    const uriHandler = new FrontendUriHandler();
    _context.subscriptions.push(vscode.window.registerUriHandler(uriHandler));
    const uri = await vscode.env.asExternalUri(vscode.Uri.parse(`${vscode.env.uriScheme}://xoj-team.xoj-playground`));
    console.log(`[INFO] URI: ${uri} registered.`);
}