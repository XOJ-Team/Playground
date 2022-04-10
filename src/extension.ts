import * as vscode from 'vscode';

import { StatusIndicator } from './ui/StatusIndicator';
import { DescriptionView } from './ui/DescriptionView';
import { ActionPanelView } from './ui/ActionPanelView';
import { WebUriHandler } from './ui/UriHandler';

export function activate(context: vscode.ExtensionContext) {
	console.log('[INFO] XOJ Playground is now active!');

	const webUriHandler = new WebUriHandler(context);
	const statusIndicator = new StatusIndicator(context);
	const descriptionView = new DescriptionView(context);
	const actionPanelView = new ActionPanelView(context);
	
}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
