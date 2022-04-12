import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Types';
export class ResultDocumentProvider {
    constructor(editor: vscode.TextEditor) {
        vscode.window.showTextDocument(editor.document, {
            viewColumn: vscode.ViewColumn.Beside
        });
    }
}