// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"xoj-playground" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let testCommand = vscode.commands.registerCommand('xoj-playground.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from XOJ Playground!');
	});

	// register a command that is invoked when extension is activated
	const connectionStatsCommandName = 'xoj-playground.showConnectionStatus';
	let connectionStatsCommand = vscode.commands.registerCommand(connectionStatsCommandName, () => {
		vscode.window.showInformationMessage(`Connected to XOJ Server.`);
	});

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = connectionStatsCommandName;
	context.subscriptions.push(myStatusBarItem);
	context.subscriptions.push(connectionStatsCommand);
	context.subscriptions.push(testCommand);

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
	myStatusBarItem.text = `$(megaphone) Connected to XOJ Server`;
	myStatusBarItem.show();
}