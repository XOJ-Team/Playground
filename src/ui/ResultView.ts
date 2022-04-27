
import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Common';
import { Judge0LookupResponse } from '../api/Common';
import { JudgeServer } from '../api/Judge';


export class ResultView {
	private _disposable: vscode.Disposable;
	private static readonly _showResultCommand = 'xoj-playground.showResult';
	private static readonly _refreshResultCommand = 'xoj-playground.showResult';
	private static readonly _viewType = 'playground.panel.resultView';
	//TODO: Replace with event/command
	private _lookupResponse: Judge0LookupResponse = { "status_id": 3, "time": "0.002", "memory": 784, "compile_output": null, "status": { "id": 3, "description": "Accepted" } } as Judge0LookupResponse;
	private onResultFetched(_lookupResponse: Judge0LookupResponse) {
		this._lookupResponse = _lookupResponse;
		console.log('[INFO] onResultFetched');
		console.log(this._lookupResponse);
		vscode.commands.executeCommand(ResultView._refreshResultCommand);
	}
	constructor(private readonly _extensionContext: vscode.ExtensionContext) {
		const resultDataProvider = new ResultDataProvider(this._lookupResponse);
		this._disposable = vscode.commands.registerCommand(ResultView._showResultCommand, this.onResultFetched, this);
		_extensionContext.subscriptions.push(this._disposable);
		this._disposable = vscode.commands.registerCommand(ResultView._refreshResultCommand, resultDataProvider.refresh, this);
		_extensionContext.subscriptions.push(this._disposable);
		this._disposable = vscode.window.createTreeView(ResultView._viewType, { treeDataProvider: resultDataProvider, showCollapseAll: true });
		_extensionContext.subscriptions.push(this._disposable);
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
				this._submissionResultModelList.push(new SubmissionResultModel('Status', lookupResponse.status.description, 'check'));
			}
			else {
				this._submissionResultModelList.push(new SubmissionResultModel(k, lookupResponse[k]));
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