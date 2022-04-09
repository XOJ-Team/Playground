import * as vscode from 'vscode';

class XojUriHandler implements vscode.UriHandler {
	handleUri(uri: vscode.Uri): vscode.ProviderResult<void> {
		let message = "Opening XOJ from Web...";
		if (uri.query) {
			message += ` It came with this query: ${uri.query}`;
		}
		vscode.window.showInformationMessage(message);
	}
}

export class WebUriHandler {
    private handler: XojUriHandler = new XojUriHandler();
    private command: vscode.Disposable;
    private commandName = 'xoj-playground.start';

    constructor(
        private readonly _extensionContext: vscode.ExtensionContext
    ) {
        this.command = vscode.commands.registerCommand(this.commandName, () => {
            _extensionContext.subscriptions.push(vscode.window.registerUriHandler(this.handler));
            const uri = vscode.env.asExternalUri(vscode.Uri.parse(`${vscode.env.uriScheme}://xoj-playground`));
            vscode.window.showInformationMessage(`Starting to handle Uris. Open ${uri} in your browser to test.`);
        });
        _extensionContext.subscriptions.push(this.command);
    }
}