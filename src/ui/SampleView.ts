import * as vscode from 'vscode';
import { marked, Renderer } from "marked";

export class SampleView implements vscode.WebviewViewProvider {
    private static readonly _viewType = "playground.container.sampleView";
  
    private _view?: vscode.WebviewView;
    private _description: string = '';
    // TODO(skk): replace with QuestionId from web activation.
  
    constructor(private readonly _extensionContext: vscode.ExtensionContext) {
      _extensionContext.subscriptions.push(
        vscode.window.registerWebviewViewProvider(SampleView._viewType, this)
      );
  
      console.log("[INFO] Sample View initialized");
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
      this._description = '#### Input 1: \n `1 2` \n #### Output 1: \n `3` \n #### Input 2: \n `1 2 3` \n #### Output 2: \n `6`';
      webviewView.webview.html = marked.parse(this._description);
      // TODO(skk): append AC rate and other info to this html
  
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
  