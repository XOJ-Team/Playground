import * as vscode from 'vscode';
import * as os from 'os';

import { StatusIndicator } from './ui/StatusIndicator';
import { DescriptionView } from './ui/DescriptionView';
import { ActionPanelView } from './ui/ActionPanelView';
import { WebUriHandler } from './ui/UriHandler';
import { ResultDocumentProvider } from './ui/Result';
import { DebugConfiguration } from './ui/DebugConfigurationProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('[INFO] XOJ Playground is now active!');

	const webUriHandler = new WebUriHandler(context);
	const statusIndicator = new StatusIndicator(context);
	const descriptionView = new DescriptionView(context);
	const actionPanelView = new ActionPanelView(context);
	// const resultDocumentProvider = new ResultDocumentProvider(vscode.window.activeTextEditor);
	// vscode.debug.registerDebugConfigurationProvider('xoj', new DebugConfiguration());
	// vscode.debug.onDidStartDebugSession(() => {
	// 	console.log('[DEBUG] Debug session started');
	// });
}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
