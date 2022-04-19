import * as vscode from "vscode";

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

  private runCode() {
    // Run code only (without submitting result to XOJ backend)
    console.log('[INFO] runCode');
  }

  private submitCode() {
    // Run code and submit result to XOJ backend
    console.log('[INFO] submitCode');
  }

  private refresh() {
    console.log('[INFO] refresh');
  }

}
