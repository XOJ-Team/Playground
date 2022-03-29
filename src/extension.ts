import * as vscode from 'vscode';

import { StatusIndicator } from './ui/statusIndicator';
import { QuestionDescriptionView } from './ui/questionDescription';
import { ActionPanelView } from './ui/actionPanel';

export function activate(context: vscode.ExtensionContext) {
	console.log('[INFO] XOJ Playground is now active!');

	const statusIndicator = new StatusIndicator(context);
	const questionDescription = new QuestionDescriptionView(context);
	const actionPanel = new ActionPanelView(context);
	
}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
