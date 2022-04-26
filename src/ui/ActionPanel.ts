import * as vscode from "vscode";

import { state } from "../api/Types";
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
    console.log(state);
    await judgeServer.submit();
  }

  private submitCode() {
    // Run code and submit result to XOJ backend
    console.log('[INFO] submitCode');
    judgeServer.getResult();
  }

  private async refresh() {
    console.log('[INFO] refresh');
    const fileUri = vscode.Uri.from;
    // await vscode.commands.executeCommand("markdown.showLockedPreviewToSide", fileUri);
    await vscode.commands.executeCommand("markdown.api.render", "# TEST");
  }

}
