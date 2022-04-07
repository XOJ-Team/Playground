import * as vscode from 'vscode';

import { ApiConnection } from '../api/types';
import { checkConnection } from '../api/connection';

export class StatusIndicator {
    private commandName = 'xoj-playground.showConnectionStatus';
    private item: vscode.StatusBarItem;
    private command: vscode.Disposable;
    private status: ApiConnection;

    constructor(
        private readonly _extensionContext: vscode.ExtensionContext,
    ) {
        this.command = vscode.commands.registerCommand(this.commandName, this.onClick);
        this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.item.command = this.commandName;
        _extensionContext.subscriptions.push(this.item);
        _extensionContext.subscriptions.push(this.command);

        // Hook text update events
        _extensionContext.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(this.update));
        _extensionContext.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(this.update));

        // Update status bar item once at start
        this.update();

        console.log('[INFO] StatusIndicator initialized');
    }

    private async update(): Promise<void> {
        this.status = await checkConnection();
        if (this.status.status) {
            this.item.text = `$(megaphone) Connected to XOJ Server`;
        } else {
            this.item.text = `$(megaphone) Disconnected to XOJ Server`;
        }
        this.item.show();
        // console.log(this.status.time);
    }

    private async onClick(): Promise<void> {
        console.log(this.status.time);
        if (this.status.status) {
            vscode.window.showInformationMessage('Currently connected to XOJ Server. Server Time: ' + this.status.time.toString());
        } else {
            vscode.window.showInformationMessage(`Currently disconnected to XOJ Server.`);
        }
    }
}
