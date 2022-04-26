import * as vscode from "vscode";
import * as path from 'path';

import { globalState } from "../api/Common";
import { JudgeServer } from "../api/Judge";

const judgeServer = new JudgeServer();
export class ActionPanel {
  private _commandList = [
    'xoj-playground.run', 
    'xoj-playground.submit', 
    'xoj-playground.refresh'
  ];
  private _command: vscode.Disposable;

  constructor(private readonly _extensionContext: vscode.ExtensionContext) {
      this._command = vscode.commands.registerCommand(this._commandList[0], this.runCode, this);
      _extensionContext.subscriptions.push(this._command);
      this._command = vscode.commands.registerCommand(this._commandList[1], this.submitCode, this);
      _extensionContext.subscriptions.push(this._command);
      this._command = vscode.commands.registerCommand(this._commandList[2], this.refresh, this);
      _extensionContext.subscriptions.push(this._command);
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
    judgeServer.getResult();
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
