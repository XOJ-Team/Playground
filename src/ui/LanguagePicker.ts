import * as vscode from 'vscode';

import { JudgeServer } from '../api/Judge';

export class LanguagePicker {
    private _command: vscode.Disposable;
    private _commandName: string = 'xoj-playground.selectLanguage';

    constructor(
        private readonly _extensionContext: vscode.ExtensionContext
    ) {
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

        this._command = vscode.commands.registerCommand(this._commandName, this.show, this);
        _extensionContext.subscriptions.push(this._command);
    }

    private async show() {
        const result = await vscode.window.showQuickPick(['C', 'C++', 'Python'], {
            placeHolder: 'Select a language',
            onDidSelectItem: item => {
                if (item === 'C') {
                    this._extensionContext.workspaceState.update('language', 'c');
                    this.setActiveDocumentLanguage('c');
                } else if (item === 'C++') {
                    this._extensionContext.workspaceState.update('language', 'cpp');
                    this.setActiveDocumentLanguage('cpp');
                } else if (item === 'Python') {
                    this._extensionContext.workspaceState.update('language', 'python');
                    this.setActiveDocumentLanguage('python');
                } else {
                    vscode.window.showInformationMessage(`Cancelled.`);
                }
            }
        });
        // vscode.window.showInformationMessage(`Language selected: ${result}`);
    }

    private setActiveDocumentLanguage(lang: string) {
        if (vscode.window.activeTextEditor?.document !== undefined) {
            vscode.languages.setTextDocumentLanguage(vscode.window.activeTextEditor.document, lang);
        }
    }
}
