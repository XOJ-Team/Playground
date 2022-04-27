
import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Common';
import { Judge0LookupResponse } from '../api/Common';
import { JudgeServer } from '../api/Judge';


export class ResultView {
	private _disposable: vscode.Disposable;
	private static readonly _showResultCommand = 'xoj-playground.showResult';
	private static readonly _refreshResultCommand = 'xoj-playground.refreshResult';
	private static readonly _viewType = 'playground.panel.resultView';
	private _submissionResultModelList: SubmissionResultModel[] = [];

	private _lookupResponse: Judge0LookupResponse = { "status_id": 88, "time": "0.002", "memory": 784, "compile_output": null, "status": { "id": 3, "description": "Accepted" } } as Judge0LookupResponse;
	private onResultFetched(_lookupResponse: Judge0LookupResponse) {
		this._lookupResponse = _lookupResponse;
		this._initSubmissionResultModelList;
		console.log('[INFO] onResultFetched');
		console.log(this._lookupResponse);
		vscode.commands.executeCommand(ResultView._refreshResultCommand,this._submissionResultModelList);
	}

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

	constructor(private readonly _extensionContext: vscode.ExtensionContext) {
		this._initSubmissionResultModelList(this._lookupResponse);
		const resultDataProvider = new ResultDataProvider(this._submissionResultModelList);
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
	private _onDidChangeTreeData: vscode.EventEmitter<SubmissionResultModel[] | undefined | null | void> = new vscode.EventEmitter<SubmissionResultModel[] | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<SubmissionResultModel[] | undefined | null | void> = this._onDidChangeTreeData.event;
	private _submissionResultModelList: SubmissionResultModel[] = [];


	constructor(private readonly submissionResultModelList: SubmissionResultModel[]) {
		this._submissionResultModelList = submissionResultModelList;
	}

	public refresh(submissionResultModelList: SubmissionResultModel[]): any {
		this._submissionResultModelList = submissionResultModelList;
		this._onDidChangeTreeData.fire(undefined);
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