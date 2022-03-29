import * as vscode from 'vscode';

import { StatusIndicator } from './ui/statusIndicator';
import { ActionCenterView } from './ui/actionCenter';

export function activate(context: vscode.ExtensionContext) {

	const statusIndicator = new StatusIndicator(context);
	const actionCenter = new ActionCenterView(context);

	console.log('[INFO] XOJ Playground is now active!');

}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
