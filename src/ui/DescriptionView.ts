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
  private _question: Question = new Question('');
  private static readonly _noQuestionLoadedString = "### No Question Loaded" + '\n'
    + "Please select a question from [XOJ Website](https://xoj.codes/questions/).";
  private static readonly _viewType = "xoj-playground.view.descriptionView";
  private _commandId = "xoj-playground.command.refresh";
  private _disposable: vscode.Disposable;


  private _view?: vscode.WebviewView;
  private _description: string = '';

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

    // TODO(skk): append AC rate and other info to this html
    // Built-in render (markdown-language-features)
    this._renderWebviewContent();
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
      this._renderWebviewContent();
    }
  }

  private async _renderWebviewContent() {
    if (this._view) {
      if (globalState.questionId !== undefined) {
        this._question.id = globalState.questionId;
      }
      if (this._question.id === '') {
        this._view.webview.html = marked.parse(DescriptionView._noQuestionLoadedString);
        return;
      }
      try {
        await this._question.get();
        this._view.webview.html = marked.parse(this._getConcatenatedMarkedString());
        vscode.window.showInformationMessage('Loaded Question: ' + this._question.title);
      } catch (err) {
        // Built-in render (markdown-language-features)
        this._view.webview.html = await vscode.commands.executeCommand('markdown.api.render', '### Oops! Error occurred: ' + err);
        // Uncomment this to use marked renderer
        // webviewView.webview.html = marked.parse('### Error occurred ' + err);
      }
      this._view.webview.html = await vscode.commands.executeCommand('markdown.api.render', this._getConcatenatedMarkedString());
    }
  }

  private _getConcatenatedMarkedString(): string {
    if (this._question.id !== '') {
      return '### ' + this._question.title + '\n'
        + this._question.desc + '\n\n'
        + '*Time Limit: ' + this._question.timeLimit + 's*'
        + '\t | \t'
        + '*Memory Limit: ' + this._question.memLimit + 'KB*';
    } else {
      return DescriptionView._noQuestionLoadedString;
    }
  }
}
