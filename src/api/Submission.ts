import * as vscode from 'vscode';
import * as rm from 'typed-rest-client/RestClient';

import { SubmissionObject } from "./Types";

const endpoint = '/submit_records/';

// TODO: add async impl and return status code
export async function submitCode(o: SubmissionObject) {
    vscode.window.setStatusBarMessage('Running your code on XOJ...');
    let code: string | undefined = vscode.window.activeTextEditor?.document.getText();
}
