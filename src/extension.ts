import * as vscode from 'vscode';

import { StatusIndicator } from './ui/StatusIndicator';
import { QuestionDescriptionView } from './ui/QuestionDescriptionView';
import { ActionPanelView } from './ui/ActionPanelView';
import { WebUriHandler } from './api/UriHandler';

export function activate(context: vscode.ExtensionContext) {
	console.log('[INFO] XOJ Playground is now active!');

	const webUriHandler = new WebUriHandler(context);
	const statusIndicator = new StatusIndicator(context);
	const questionDescriptionView = new QuestionDescriptionView(context);
	const actionPanelView = new ActionPanelView(context);
	
}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
