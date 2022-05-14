import * as vscode from 'vscode';

import { ConnectionChecker } from '../api/Connection';

// class Timer {
//     private _id?: NodeJS.Timeout;
//     private _callback: (...args: any[]) => void;
//     private _args: any;

//     constructor(callback: (...args: any[]) => void, thisArg?: any) {
//         this._callback = callback;
//         this._args = thisArg;
//     }

//     public start() {
//         this._id = setTimeout(() => {
//             this._callback(this._args);
//             this.start();
//         }, 3000);
//     }

//     public stop() {
//         if (this._id) {
//             clearTimeout(this._id);
//         }
//     }
// }

export class StatusIndicator {

    // TODO(skk): add running indicator

    private _command = 'xoj-playground.showConnectionStatus';
    private _item: vscode.StatusBarItem;
    private _disposable: vscode.Disposable;
    private _checker: ConnectionChecker = new ConnectionChecker();
    // private _timer: Timer;

    constructor(private readonly _extensionContext: vscode.ExtensionContext) {
        this._disposable = vscode.commands.registerCommand(this._command, this.onClick, this);
        this._item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this._item.command = this._command;
        // this._timer = new Timer(this.update, this);
        
        _extensionContext.subscriptions.push(this._item);
        _extensionContext.subscriptions.push(this._disposable);

        // Update status bar item once at start
        this.update();
        this.timeout();
        // this._timer.start();

        console.log('[INFO] StatusIndicator initialized');
    }

    private timeout() {
        setTimeout(() => {
            this.update();
            this.timeout();
        }, 3000);
    }
    

    private async update(): Promise<void> {
        await this._checker.check();

        if (this._checker.status) {
            this._item.text = `$(megaphone) Connected to XOJ Server`;
        } else {
            this._item.text = `$(loading~spin) Connecting...`;
        }
        this._item.show();
    }

    private async onClick(): Promise<void> {
        if (this._checker.status) {
            vscode.window.showInformationMessage('Currently connected to XOJ Server. Server Time: ', this._checker.time.toString());
        } else {
            vscode.window.showWarningMessage(`Currently disconnected to XOJ Server. Local Time: `, this._checker.time.toString());
        }
    }
}
