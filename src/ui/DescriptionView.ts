import * as vscode from "vscode";
import { marked, Renderer } from "marked";

import { Question } from "../api/Question";

marked.setOptions
({
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
  private static readonly viewType = "playground.container.descriptionView";

  private _view?: vscode.WebviewView;
  private _description: string = '';
  // TODO(skk): replace with QuestionId from web activation.
  private _question: Question = new Question('');

  constructor(private readonly _extensionContext: vscode.ExtensionContext) {
    _extensionContext.subscriptions.push(
      vscode.window.registerWebviewViewProvider(DescriptionView.viewType, this)
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
    this._description = '### 001: A + B Problem \n **Description:** given two numbers A and B, find the sum of A and B.';
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

//   private _getHtmlForWebview(webview: vscode.Webview) {
//     // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
//     const scriptUri = webview.asWebviewUri(
//       vscode.Uri.joinPath(
//         this._extensionContext.extensionUri,
//         "assets",
//         "main.js"
//       )
//     );

//     // Do the same for the stylesheet.
//     const styleResetUri = webview.asWebviewUri(
//       vscode.Uri.joinPath(
//         this._extensionContext.extensionUri,
//         "assets",
//         "reset.css"
//       )
//     );
//     const styleVSCodeUri = webview.asWebviewUri(
//       vscode.Uri.joinPath(
//         this._extensionContext.extensionUri,
//         "assets",
//         "vscode.css"
//       )
//     );
//     const styleMainUri = webview.asWebviewUri(
//       vscode.Uri.joinPath(
//         this._extensionContext.extensionUri,
//         "assets",
//         "main.css"
//       )
//     );

//     // Use a nonce to only allow a specific script to be run.
//     const nonce = getNonce();

//     // return `<!DOCTYPE html>
// 	// 		<html lang="en">
// 	// 		<head>
// 	// 			<meta charset="UTF-8">

// 	// 			<!--
// 	// 				Use a content security policy to only allow loading images from https or from our extension directory,
// 	// 				and only allow scripts that have a specific nonce.
// 	// 			-->
// 	// 			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

// 	// 			<meta name="viewport" content="width=device-width, initial-scale=1.0">

// 	// 			<link href="${styleResetUri}" rel="stylesheet">
// 	// 			<link href="${styleVSCodeUri}" rel="stylesheet">
// 	// 			<link href="${styleMainUri}" rel="stylesheet">
				
// 	// 			<title>XOJ Action Center</title>
// 	// 		</head>
// 	// 		<body>
//     //         <h3 id='id-0001-a--b-problem'><strong>No. 0001</strong> A + B Problem</h3>
//     //         <p><strong>Description</strong>: Given two integers A, B, return the sum of them.</p>
//     //         <p><strong>Sample Input</strong>:</p>
//     //         <p><code>1 2</code></p>
//     //         <p><strong>Sample Output</strong>:</p>
//     //         <p><code>3</code></p>
//     //         <p>&nbsp;</p>
//     //         <ul></ul>

// 	// 			<script nonce="${nonce}" src="${scriptUri}"></script>
// 	// 		</body>
// 	// 		</html>`;
//     console.log(Marked.parse('I am using __markdown__.'));
//   }

}

// function getNonce() {
//   let text = "";
//   const possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (let i = 0; i < 32; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }
