import * as vscode from 'vscode';

import { StatusIndicator } from './ui/statusIndicator';
import { ActionCenterView } from './ui/actionCenter';

export function activate(context: vscode.ExtensionContext) {

	const statusIndicator = new StatusIndicator(context);

	const actionCenter = new ActionCenterView(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ActionCenterView.viewType, actionCenter));

	context.subscriptions.push(
		vscode.commands.registerCommand('calicoColors.addColor', () => {
			actionCenter.addColor();
		}));

	context.subscriptions.push(
		vscode.commands.registerCommand('calicoColors.clearColors', () => {
			actionCenter.clearColors();
		}));

	console.log('[INFO] XOJ Playground is now active!');

}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
