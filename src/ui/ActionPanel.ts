import * as vscode from "vscode";
import * as path from 'path';

import { globalState } from "../api/Common";
import { JudgeServer } from "../api/Judge";

const judgeServer = new JudgeServer();

export class ActionPanel {
  private _commandList = [
    'xoj-playground.run', 
    'xoj-playground.submit', 
    // 'xoj-playground.refresh'
  ];
  private _disposable: vscode.Disposable;

  constructor(private readonly _extensionContext: vscode.ExtensionContext) {
      this._disposable = vscode.commands.registerCommand(this._commandList[0], this.runCode, this);
      _extensionContext.subscriptions.push(this._disposable);
      this._disposable = vscode.commands.registerCommand(this._commandList[1], this.submitCode, this);
      _extensionContext.subscriptions.push(this._disposable);
  }

  private async runCode() {
    // Run code only (without submitting result to XOJ backend)
    console.log('[INFO] runCode');
    console.log(globalState);
  }

  private async submitCode() {
    // Run code and submit result to XOJ backend
    if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.getText() !== '') {
      globalState.code = vscode.window.activeTextEditor.document.getText();
      vscode.window.showInformationMessage('Your code is being submitted...');
    } else {
      vscode.window.showErrorMessage("There's no code to submit, please review your active document.");
      return;
    }
    judgeServer.submit();
    judgeServer.getResult().then(result => {vscode.commands.executeCommand('xoj-playground.showResult', result);});
  }

  private async refresh() {
    // TEST CODE, DO NOT USE
    console.log('[INFO] refresh');
    vscode.workspace.openTextDocument({
        language: 'markdown',
        content: '# TEST'
      }).then(document => vscode.commands.executeCommand('markdown.showPreviewToSide', document));
    }
}
