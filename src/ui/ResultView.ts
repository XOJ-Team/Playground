import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Types';

export class ResultView {

    private static readonly _viewType = 'xoj-playground.resultView';

    constructor(private readonly _extensionContext: vscode.ExtensionContext) {


        // const resultDocumentProvider = new ResultDocumentProvider(vscode.window.activeTextEditor);\

        // vscode.debug.registerDebugConfigurationProvider('xoj', new DebugConfiguration());
        // vscode.debug.onDidStartDebugSession(() => {
        // 	console.log('[DEBUG] Debug session started');
        // });
    }

    // public async resolveCustomTextEditor(
    //     document: vscode.TextDocument,
    //     webviewPanel: vscode.WebviewPanel,
    //     _token: vscode.CancellationToken
    // ): Promise<void> {

    // }

    public async show() {

        const fileUri = vscode.Uri.file("/home/nuc/test.md");
        await vscode.commands.executeCommand("markdown.showLockedPreviewToSide", fileUri);

        // vscode.window.showTextDocument(editor.document, {
        //     viewColumn: vscode.ViewColumn.Beside
        // });
    }

    public log() {
        console.log(vscode.workspace.textDocuments);
        console.log(vscode.window.visibleTextEditors);
    }

}
