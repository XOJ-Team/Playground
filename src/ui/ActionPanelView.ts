import * as vscode from "vscode";

export class ActionPanelView implements vscode.WebviewViewProvider {
  private static readonly _viewType = "playground.container.actionView";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionContext: vscode.ExtensionContext) {
    _extensionContext.subscriptions.push(
      vscode.window.registerWebviewViewProvider(ActionPanelView._viewType, this)
    );

    console.log("[INFO] ActionCenter View initialized");
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionContext.extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

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

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionContext.extensionUri,
        "assets",
        "main.js"
      )
    );

    // Do the same for the stylesheet.
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionContext.extensionUri,
        "assets",
        "reset.css"
      )
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionContext.extensionUri,
        "assets",
        "vscode.css"
      )
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionContext.extensionUri,
        "assets",
        "main.css"
      )
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    // return `<!DOCTYPE html>
    // 	<html lang="en">
    // 	<head>
    // 		<meta charset="UTF-8">

    // 		<!--
    // 			Use a content security policy to only allow loading images from https or from our extension directory,
    // 			and only allow scripts that have a specific nonce.
    // 		-->
    // 		<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

    // 		<meta name="viewport" content="width=device-width, initial-scale=1.0">

    // 		<link href="${styleResetUri}" rel="stylesheet">
    // 		<link href="${styleVSCodeUri}" rel="stylesheet">
    // 		<link href="${styleMainUri}" rel="stylesheet">

    // 		<title>XOJ Action Center</title>
    // 	</head>
    // 	<body>

    //     <ul></ul>
    // 		<button class="action-button">Run Code</button>
    // 		<ul></ul>
    // 		<button class="action-button">Submit</button>
    // 		<ul></ul>
    // 		<button class="action-button">Reset Answer</button>
    //         <ul></ul>
    // 		<button class="action-button">Refresh</button>

    // 		<script nonce="${nonce}" src="${scriptUri}"></script>
    // 	</body>
    // 	</html>`;

    return `
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleResetUri}" rel="stylesheet">
		<link href="${styleVSCodeUri}" rel="stylesheet">
		<link href="${styleMainUri}" rel="stylesheet">
        <ul></ul>
        <button class="action-button">Run Code</button>
        <ul></ul>
        <button class="action-button">Submit</button>
        <ul></ul>
        <button class="action-button">Reset Answer</button>
        <ul></ul>
        <button class="action-button">Refresh</button>
        <script nonce="${nonce}" src="${scriptUri}"></script>`;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}