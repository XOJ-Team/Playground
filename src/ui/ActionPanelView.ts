import * as vscode from "vscode";

export class ActionPanel {
  private _commandList = [
    'xoj-playground.selectLanguage', 
    'xoj-playground.run', 
    'xoj-playground.submit', 
    'xoj-playground.refresh'
  ];
  private _command: vscode.Disposable;

  constructor(
    private readonly _extensionContext: vscode.ExtensionContext,
  ) {
      this._command = vscode.commands.registerCommand(this._commandList[0], this.selectLanguageQuickPick, this);
      _extensionContext.subscriptions.push(this._command);
      this._command = vscode.commands.registerCommand(this._commandList[1], this.runCode, this);
      _extensionContext.subscriptions.push(this._command);
      this._command = vscode.commands.registerCommand(this._commandList[2], this.submitCode, this);
      _extensionContext.subscriptions.push(this._command);
      this._command = vscode.commands.registerCommand(this._commandList[3], this.refresh, this);
      _extensionContext.subscriptions.push(this._command);
  }

  private selectLanguageQuickPick() {
    console.log('[INFO] selectLanguageQuickPick');
    vscode.languages.
  }

  private runCode() {
    console.log('[INFO] runCode');
  }

  private submitCode() {
    console.log('[INFO] submitCode');
  }

  private refresh() {
    console.log('[INFO] refresh');
  }

}
