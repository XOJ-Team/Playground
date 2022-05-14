import * as vscode from "vscode";
import { marked, Renderer } from "marked";

import { Question } from "../api/Question";
import { globalState } from "../api/Common";

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
  private _commandId = "xoj-playground.refresh";
  private _disposable: vscode.Disposable;

  private _view?: vscode.WebviewView;
  private _description: string = '';
  // TODO(skk): replace with QuestionId from web activation.
  private _question: Question = new Question('');

  constructor(private readonly _extensionContext: vscode.ExtensionContext) {
    _extensionContext.subscriptions.push(
      vscode.window.registerWebviewViewProvider(DescriptionView._viewType, this)
    );
    this._disposable = vscode.commands.registerCommand(this._commandId, this.refresh, this);
    _extensionContext.subscriptions.push(this._disposable);
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
      // Built-in render (markdown-language-features)
      webviewView.webview.html = await vscode.commands.executeCommand('markdown.api.render', '### Error occurred ' + err);
      // Uncomment this to use marked renderer
      // webviewView.webview.html = marked.parse('### Error occurred ' + err);
    }

    // Built-in render (markdown-language-features)
    webviewView.webview.html = await vscode.commands.executeCommand('markdown.api.render', this._question.getConcatenated());
    // Uncomment this to use marked renderer
    // webviewView.webview.html = marked.parse(this._question.getConcatenated());
    // vscode.window.showInformationMessage('Loaded: ' + this._question.title);

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

  public async refresh() {
    if (this._view) {
      this._question.id = globalState.questionId;
      await this._question.get();
      this._view.webview.html = marked.parse(this._question.getConcatenated());
      vscode.window.showInformationMessage('Loaded Question: ' + this._question.title);
    }
  }
}
