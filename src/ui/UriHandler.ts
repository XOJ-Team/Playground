import * as vscode from 'vscode';

import { WebSession } from '../api/Types';

class FrontendUriHandler implements vscode.UriHandler {
    handleUri(uri: vscode.Uri): vscode.ProviderResult<void> {
        if (uri.query) {
            const query = new URL(uri.toString(true));
            console.log(uri.toString());
            console.log(query.searchParams.get('sessionId'));
            console.log(query.searchParams.get('questionId'));
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

    // private async register(_context: vscode.ExtensionContext) {
    //     _context.subscriptions.push(vscode.window.registerUriHandler(this._handler));
    //     const uri = await vscode.env.asExternalUri(vscode.Uri.parse(`${vscode.env.uriScheme}://XOJ-Team.xoj-playground`));
    //     console.log(`${uri} registered.`);
    // }
}

// TODO(skk): figure out why so why so
async function register(_context: vscode.ExtensionContext) {
    const uriHandler = new FrontendUriHandler();
    _context.subscriptions.push(vscode.window.registerUriHandler(uriHandler));
    const uri = await vscode.env.asExternalUri(vscode.Uri.parse(`${vscode.env.uriScheme}://xoj-team.xoj-playground`));
    console.log(`${uri} registered.`);
}