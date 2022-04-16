import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Types';
export class ResultViewProvider implements vscode.CustomTextEditorProvider {

    private static readonly _viewType = 'xoj-playground.resultView';

    constructor(private readonly _extensionContext: vscode.ExtensionContext) {
        // vscode.window.showTextDocument(editor.document, {
        //     viewColumn: vscode.ViewColumn.Beside
        // });
    }

    private async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        
    }

}
