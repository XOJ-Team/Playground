import * as vscode from 'vscode';

class XojUriHandler implements vscode.UriHandler {
	handleUri(uri: vscode.Uri): vscode.ProviderResult<void> {
		let message = "Opening XOJ from Web...";
		if (uri.query) {
			message += ` It came with this query: ${uri.query}`;
		}
		console.log(message);
	}
}

export class WebUriHandler {
    private _handler: XojUriHandler = new XojUriHandler();
    private _command: vscode.Disposable;
    private _commandName: string = 'xoj-playground.startFromWeb';

    constructor(
        private readonly _extensionContext: vscode.ExtensionContext
    ) {
        this._command = vscode.commands.registerCommand(this._commandName, async () => {
            _extensionContext.subscriptions.push(vscode.window.registerUriHandler(this._handler));
            const uri = await vscode.env.asExternalUri(vscode.Uri.parse(`${vscode.env.uriScheme}://xoj-playground.start`));
            console.log(`Starting to handle Uris. Open ${uri} in your browser to test.`);
        });
        _extensionContext.subscriptions.push(this._command);
    }
}
