
import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Common';
import { Judge0LookupResponse } from '../api/Common';
import { JudgeServer } from '../api/Judge';
export class ResultView {

	private static readonly _viewType = 'playground.panel.resultView';
	//TODO: Replace with event/command
	private _lookupResponse: Judge0LookupResponse = { "status_id": 3, "time": "0.002", "memory": 784, "compile_output": null, "status": { "id": 3, "description": "Accepted" } } as Judge0LookupResponse;
	constructor(private readonly _extensionContext: vscode.ExtensionContext) {
		const view = vscode.window.createTreeView(ResultView._viewType, { treeDataProvider: new ResultDataProvider(this._lookupResponse), showCollapseAll: true });
		_extensionContext.subscriptions.push(view);
	}

}

export class SubmissionResultModel {
	// public readonly result: Judge0LookupResponse;
	public readonly resultType: string;
	public readonly resultValue?: any;
	public readonly resultIcon: vscode.ThemeIcon;
	constructor(resultType: string, resultValue?: any, resultIcon?: string) {
		this.resultType = resultType;
		this.resultValue = resultValue;
		this.resultIcon = resultIcon ? new vscode.ThemeIcon(resultIcon) : new vscode.ThemeIcon("info");
	}
}


export class ResultDataProvider implements vscode.TreeDataProvider<SubmissionResultModel> {

    private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
    readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;
    private _submissionResultModelList: SubmissionResultModel[] = [];
	private _initSubmissionResultModelList(lookupResponse: Judge0LookupResponse) {
		let k: keyof Judge0LookupResponse;
		for (k in lookupResponse) {
			if (k === 'status') {
				this._submissonResultModelList.push(new SubmissionResultModel('Status', lookupResponse.status.description, 'check'));
			}
			else{
				this._submissonResultModelList.push(new SubmissionResultModel(k, lookupResponse[k]));
			}
		}
	}


	constructor(private readonly _lookupResponse: Judge0LookupResponse) {
		this._initSubmissionResultModelList(_lookupResponse);
	}

	public refresh(): any {
		this._onDidChangeTreeData.fire(void 0);
	}

	public getTreeItem(element: SubmissionResultModel): vscode.TreeItem {
		return {
			label: element.resultType + ': ' + element.resultValue,
			iconPath: element.resultIcon,
		};
	}
	public getChildren(element?: SubmissionResultModel) {
		if (element) {
			return null;
		}
		return this._submissionResultModelList;
    }
}