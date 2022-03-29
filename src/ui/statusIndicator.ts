import * as vscode from 'vscode';

export class StatusIndicator {
    private commandName = 'xoj-playground.showConnectionStatus';
    private item: vscode.StatusBarItem;
    private command: vscode.Disposable;

    constructor(
        private readonly _extensionContext: vscode.ExtensionContext,
    ) {
        this.command = vscode.commands.registerCommand(this.commandName, () => {
            // TODO: check connection status to XOJ backend
            // TODO (skk): implment dedicated function to check connection status async.
            vscode.window.showInformationMessage(`Connected to XOJ Server.`);
        });
        this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.item.command = this.commandName;
        _extensionContext.subscriptions.push(this.item);
        _extensionContext.subscriptions.push(this.command);

        // Hook text update events
        _extensionContext.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(this.update));
        _extensionContext.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(this.update));

        // Update status bar item once at start
        this.update();

        console.log('[INFO] StatusIndicator initalized');
    }

    private async checkServerStatus() {
        // TODO: check connection status to XOJ backend
        // TODO (skk): implment dedicated function to check connection status async.

    }

    private update(): void {
        this.item.text = `$(megaphone) Connected to XOJ Server`;
        this.item.show();
    }
}

