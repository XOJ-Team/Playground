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
  private _question: Question = new Question('11');

  constructor(private readonly _extensionContext: vscode.ExtensionContext) {
    _extensionContext.subscriptions.push(
      vscode.window.registerWebviewViewProvider(DescriptionView._viewType, this)
    );
    console.log("[INFO] Question Description View initialized");
  }

  public async resolveWebviewView(
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
    // TODO(skk): append AC rate and other info to this html
    try {
      await this._question.get();
    } catch (err) {
      webviewView.webview.html = marked.parse('### Error occurred ' + err);
    }
    
    webviewView.webview.html = marked.parse(this.getMarkdownString());
    vscode.window.showInformationMessage('Question loaded: ' + this._question.title);

    // webviewView.webview.onDidReceiveMessage((data) => {
    //   switch (data.type) {
    //     case "colorSelected": {
    //       vscode.window.activeTextEditor?.insertSnippet(
    //         new vscode.SnippetString(`#${data.value}`)
    //       );
    //       break;
    //     }
    //   }
    // });
  }

  public getMarkdownString() {
    return '### '
      + this._question.title
      + '\n'
      + this._question.desc
      + '\n\n'
      + '*Time Limit: '
      + this._question.timeLimit
      + 's*'
      + '\t | \t'
      + '*Memory Limit: '
      + this._question.memLimit
      + 'MB*';
  }
  
}
