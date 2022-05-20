import * as vscode from "vscode";
import * as path from 'path';

import { globalState } from "../api/Common";
import { judgeServerInstance } from "../api/GlobalInstance";

const judgeServer = judgeServerInstance;
export class ActionPanel {
  private _commandList = [
    'xoj-playground.command.run',
    'xoj-playground.command.submit'
  ];
  private _disposable: vscode.Disposable;

  constructor(private readonly _extensionContext: vscode.ExtensionContext) {
    this._disposable = vscode.commands.registerCommand(this._commandList[0], this.runCode, this);
    _extensionContext.subscriptions.push(this._disposable);
    this._disposable = vscode.commands.registerCommand(this._commandList[1], this.submitCode, this);
    _extensionContext.subscriptions.push(this._disposable);
  }

/**
 * It takes the code from the active editor, sends it to the server, and then displays the result in a
 * new panel.
 * @returns The result of the runCode() function is the result of the judgeServer.run() function.
 */
  private async runCode() {
    // Run code only (without submitting result to XOJ backend)

    if (globalState.sessionId === '') {
      vscode.window.showErrorMessage("To run code, please first login through XOJ Website.");
      return;
    }
    if (!globalState.isLanguageSet || globalState.langId === -1 || globalState.lang === '') {
      vscode.window.showErrorMessage("To run code, please first choose your language.");
      return;
    }
    if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.getText() !== '') {
      globalState.stdin = await this.getUserInput() || '';
      globalState.code = vscode.window.activeTextEditor.document.getText();
      vscode.window.showInformationMessage('Your submission is uploaded and queued...');
    } else {
      vscode.window.showErrorMessage("There's no code to run remotely, please review your active document.");
      return;
    }

    console.log('[INFO] runCode start');
    console.log(globalState);

    judgeServer.run().then(res => {
      console.log(res);
      if (res.statusCode === 200 && res.result !== null && (res.result?.obj !== undefined || null)) {
        console.log("[INFO] runCode success");
        vscode.window.showInformationMessage('Your code is submitted successfully.');
        vscode.commands.executeCommand('xoj-playground.showResult', res.result.obj);
        vscode.commands.executeCommand('xoj-playground.view.resultView.focus');
      } else {
        vscode.window.showErrorMessage('Oops, code submission failed.');
      }
    });
  }

/**
 * It takes the code from the active editor, sends it to the server, and then displays the result in a
 * new tab.
 */
  private async submitCode() {
    // Run code and submit result to XOJ backend
    if (globalState.sessionId === '') {
      vscode.window.showErrorMessage("To submit code, please first login through XOJ Website.");
      return;
    }
    if (!globalState.isLanguageSet || globalState.langId === -1 || globalState.lang === '') {
      vscode.window.showErrorMessage("To submit code, please first choose your language.");
      return;
    }

    if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.getText() !== '') {
      globalState.code = vscode.window.activeTextEditor.document.getText();
      vscode.window.showInformationMessage('Your code is being submitted...');
    } else {
      vscode.window.showErrorMessage("There's no code to submit, please review your active document.");
      return;
    }
    judgeServer.submit().then(res => {
      if (res.statusCode === 200 && res.result !== null && (res.result?.obj !== undefined || null)) {
        console.log("[INFO] submitCode success"+res.result.obj);
        vscode.window.showInformationMessage('Your code is submitted successfully.');
        vscode.commands.executeCommand('xoj-playground.showResult', res.result.obj);
        vscode.commands.executeCommand('xoj-playground.view.resultView.focus');
      } else {
        vscode.window.showErrorMessage('Oops, code submission failed.');
      }
    });
  }

/**
 * It's a function that returns a promise that resolves to a string.
 * @returns The result of the user input.
 */
  private async getUserInput() {
    const result = await vscode.window.showInputBox({
      ignoreFocusOut: true,
      valueSelection: [2, 4],
      placeHolder: 'Enter your test input here...',
      prompt: 'Enter your test input above, and XOJ will run remotely with these inputs for you.',
    });
    return result;
  }
}
