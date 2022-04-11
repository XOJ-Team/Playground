import * as vscode from "vscode";
import { marked, Renderer } from "marked";

import { Question } from "../api/Question";

marked.setOptions({
  renderer: new Renderer,
  gfm: true,
  //tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

export class DescriptionView implements vscode.WebviewViewProvider {
  private static readonly _viewType = "playground.container.descriptionView";

  private _view?: vscode.WebviewView;
  private _description: string = '';
  // TODO(skk): replace with QuestionId from web activation.
  private _question: Question = new Question('');

  constructor(private readonly _extensionContext: vscode.ExtensionContext) {
    _extensionContext.subscriptions.push(
      vscode.window.registerWebviewViewProvider(DescriptionView._viewType, this)
    );

    console.log("[INFO] Question Description View initialized");
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionContext.extensionUri],
    };

    // TODO(skk): replace with API calls
    this._description = '### 001: A + B Problem \n **Description:** given two numbers A and B, find the sum of A and B. \n ';
    webviewView.webview.html = marked.parse(this._description);

    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "colorSelected": {
          vscode.window.activeTextEditor?.insertSnippet(
            new vscode.SnippetString(`#${data.value}`)
          );
          break;
        }
      }
    });
  }
}
