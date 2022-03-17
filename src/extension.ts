import * as vscode from 'vscode';

let connectionStatsBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('"xoj-playground" is now active!');

	// register a command that is invoked when extension is activated
	const connectionStatsCommandName = 'xoj-playground.showConnectionStatus';
	let connectionStatsCommand = vscode.commands.registerCommand(connectionStatsCommandName, () => {
		// TODO:check connection status to XOJ backend 
		vscode.window.showInformationMessage(`Connected to XOJ Server.`);
	});

	connectionStatsBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	connectionStatsBarItem.command = connectionStatsCommandName;
	context.subscriptions.push(connectionStatsBarItem);
	context.subscriptions.push(connectionStatsCommand);

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

// this method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}

function updateStatusBarItem(): void {
	connectionStatsBarItem.text = `$(megaphone) Connected to XOJ Server`;
	connectionStatsBarItem.show();
}