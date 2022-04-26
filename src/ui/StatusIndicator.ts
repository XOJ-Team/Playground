import * as vscode from 'vscode';

import { ConnectionChecker } from '../api/Connection';
export class StatusIndicator {
    private _command = 'xoj-playground.showConnectionStatus';
    private _item: vscode.StatusBarItem;
    private _disposable: vscode.Disposable;
    private _checker: ConnectionChecker = new ConnectionChecker();

    constructor(private readonly _extensionContext: vscode.ExtensionContext) {
        this._disposable = vscode.commands.registerCommand(this._command, this.onClick, this);
        this._item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this._item.command = this._command;
        _extensionContext.subscriptions.push(this._item);
        _extensionContext.subscriptions.push(this._disposable);

        // Hook text update events (lousy btw, so disabled for now)
        // _extensionContext.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(this.update, this));
        // _extensionContext.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(this.update, this));

        // Update status bar item once at start
        this.update();

        console.log('[INFO] StatusIndicator initialized');
    }

    private async update(): Promise<void> {
        await this._checker.check();
        if (this._checker.status) {
            this._item.text = `$(megaphone) Connected to XOJ Server`;
        } else {
            this._item.text = `$(megaphone) Connecting...`;
        }
        this._item.show();
    }

    private async onClick(): Promise<void> {
        if (this._checker.status) {
            vscode.window.showInformationMessage('Currently connected to XOJ Server. Server Time: ', this._checker.time.toString());
        } else {
            vscode.window.showWarningMessage(`Currently disconnected to XOJ Server.`);
        }
    }
}
