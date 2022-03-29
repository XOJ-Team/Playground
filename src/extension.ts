import * as vscode from 'vscode';

import { StatusIndicator } from './ui/statusIndicator';
import { ActionCenterView } from './ui/actionCenter';

export function activate(context: vscode.ExtensionContext) {
	console.log('[INFO] XOJ Playground is now active!');

	const statusIndicator = new StatusIndicator(context);
	const actionCenter = new ActionCenterView(context);

}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
