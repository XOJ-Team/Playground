import { compileFunction } from 'vm';
import * as vscode from 'vscode';

import { JudgeServer } from '../api/Judge';

export class LanguagePicker {
    private _disposable: vscode.Disposable;
    private _command: string = 'xoj-playground.selectLanguage';

    private _items: vscode.QuickPickItem[] = [
        { label: 'C', description: '-std=c11', picked: true },
        { label: 'C++', description: '-std=c++14' },
        { label: 'Java', description: 'OpenJDK 11' },
        { label: 'Python', description: '3.8' },
        { label: 'Golang', description: '1.17' }
    ];

    constructor(private readonly _extensionContext: vscode.ExtensionContext) {
        // TODO(skk): figure out that this does...
        // this._command = vscode.commands.registerCommand(this._commandName, async () => {
        //     const options: { [key: string]: (context: vscode.ExtensionContext) => Promise<void> } = {
        //         show: () => this.show()
        //     };
        //     const quickPick = vscode.window.createQuickPick();
        //     quickPick.items = Object.keys(options).map(label => ({ label }));
        //     quickPick.onDidChangeSelection(selection => {
        //         if (selection[0]) {
        //             options[selection[0].label](_extensionContext)
        //                 .catch(console.error);
        //         }
        //     });
        //     quickPick.onDidHide(() => quickPick.dispose());
        //     quickPick.show();
        // }, this);

        this._disposable = vscode.commands.registerCommand(this._command, this.show, this);
        _extensionContext.subscriptions.push(this._disposable);
    }

    private async show() {
        const result = await vscode.window.showQuickPick(this._items, {
            canPickMany: false,
            placeHolder: 'Select a language',
            onDidSelectItem: item => {
                if (typeof item === 'string') {
                    this.setActiveDocumentLanguage(item);
                } else {
                    if (item.label === 'C') {
                        this._extensionContext.workspaceState.update('language', 'c');
                        this.setActiveDocumentLanguage('c');
                    } else if (item.label === 'C++') {
                        this._extensionContext.workspaceState.update('language', 'cpp');
                        this.setActiveDocumentLanguage('cpp');
                    } else if (item.label === 'Python') {
                        this._extensionContext.workspaceState.update('language', 'python');
                        this.setActiveDocumentLanguage('python');
                    } else if (item.label === 'Java') {
                        this._extensionContext.workspaceState.update('language', 'java');
                        this.setActiveDocumentLanguage('java');
                    } else if (item.label === 'Golang') {
                        this._extensionContext.workspaceState.update('language', 'go');
                        this.setActiveDocumentLanguage('go');
                    }
                }
            }
        });
    }

    private setActiveDocumentLanguage(lang: string) {
        if (vscode.window.activeTextEditor?.document !== undefined) {
            vscode.languages.setTextDocumentLanguage(vscode.window.activeTextEditor.document, lang);
        }
    }
}
