import * as vscode from 'vscode';

import { StatusIndicator } from './ui/StatusIndicator';
import { DescriptionView } from './ui/DescriptionView';
import { SampleView } from './ui/SampleView';
import { ActionPanel } from './ui/ActionPanel';
import { WebUriHandler } from './ui/UriHandler';
import { LanguagePicker } from './ui/LanguagePicker';
import { ResultViewProvider } from './ui/ResultView';
import { DebugConfiguration } from './ui/DebugConfigurationProvider';


// // Our implementation of a UriHandler.
// class MyUriHandler implements vscode.UriHandler {
// 	handleUri(uri: vscode.Uri): vscode.ProviderResult<void> {
// 		let message = "Handled a Uri!";
// 		if (uri.query) {
// 			message += ` It came with this query: ${uri.query}`;
// 		}
// 		vscode.window.showInformationMessage(message);
// 	}
// }

export function activate(context: vscode.ExtensionContext) {
	console.log('[INFO] XOJ Playground is now active!');

	const webUriHandler = new WebUriHandler(context);
	const statusIndicator = new StatusIndicator(context);
	const descriptionView = new DescriptionView(context);
	const sampleView = new SampleView(context);
	const actionPanel = new ActionPanel(context);
	const languagePicker = new LanguagePicker(context);
}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}


// async function reg(context: vscode.ExtensionContext) {
// 	const uriHandler = new MyUriHandler();
// 	context.subscriptions.push(vscode.window.registerUriHandler(uriHandler));
// 	// You don't have to get the Uri from the `vscode.env.asExternalUri` API but it will add a query
// 	// parameter (ex: "windowId%3D14") that will help VS Code decide which window to redirect to.
// 	// If this query parameter isn't specified, VS Code will pick the last windows that was focused.
// 	const uri = await vscode.env.asExternalUri(vscode.Uri.parse(`${vscode.env.uriScheme}://XOJ-Team.xoj-playground`));
// 	vscode.window.showInformationMessage(`Starting to handle Uris. Open ${uri} in your browser to test.`);
// }