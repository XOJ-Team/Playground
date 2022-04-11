import * as vscode from 'vscode';

import { ConnectionChecker } from '../api/Connection';
export class StatusIndicator {
    private commandName = 'xoj-playground.showConnectionStatus';
    private item: vscode.StatusBarItem;
    private command: vscode.Disposable;
    private checker: ConnectionChecker = new ConnectionChecker();

    constructor(
        private readonly _extensionContext: vscode.ExtensionContext,
    ) {
        this.command = vscode.commands.registerCommand(this.commandName, this.onClick, this);
        this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.item.command = this.commandName;
        _extensionContext.subscriptions.push(this.item);
        _extensionContext.subscriptions.push(this.command);

        // Hook text update events
        _extensionContext.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(this.update, this));
        _extensionContext.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(this.update, this));

        // Update status bar item once at start
        this.update();

        console.log('[INFO] StatusIndicator initialized');
    }

    private async update(): Promise<void> {
        await this.checker.check();
        if (this.checker.status) {
            this.item.text = `$(megaphone) Connected to XOJ Server`;
        } else {
            this.item.text = `$(megaphone) Connecting...`;
        }
        this.item.show();
    }

    private async onClick(): Promise<void> {
        if (this.checker.status) {
            vscode.window.showInformationMessage('Currently connected to XOJ Server. Server Time: ', this.checker.time.toString());
        } else {
            vscode.window.showWarningMessage(`Currently disconnected to XOJ Server.`);
        }
    }
}