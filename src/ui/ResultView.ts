
import { runInThisContext } from 'vm';
import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Common';
import { JudgeServerWrapper } from '../api/Common';
import { Judge0Response } from '../api/Common';
import { JudgeServer } from '../api/Judge';


export class ResultView {
	private _disposable: vscode.Disposable;
	private static readonly _showResultCommand = 'xoj-playground.showResult';
	private static readonly _refreshResultCommand = 'xoj-playground.refreshResult';
	private static readonly _viewType = 'playground.panel.resultView';
	private _submissionResultModelList: SubmissionResultModel[] = [];
	private _resultDataProvider = new ResultDataProvider(this._submissionResultModelList);

	private _lookupResponse: Judge0Response = {} as Judge0Response;

	constructor(private readonly _extensionContext: vscode.ExtensionContext) {
		this._disposable = vscode.commands.registerCommand(ResultView._showResultCommand, this.onResultFetched, this);
		_extensionContext.subscriptions.push(this._disposable);

		this._disposable = vscode.commands.registerCommand(ResultView._refreshResultCommand, this._resultDataProvider.refresh, this);
		_extensionContext.subscriptions.push(this._disposable);

		this._disposable = vscode.window.createTreeView(ResultView._viewType, { treeDataProvider: this._resultDataProvider, showCollapseAll: true });
		_extensionContext.subscriptions.push(this._disposable);
	}

	private onResultFetched(res: Judge0Response) {
		this._lookupResponse = res;
		this._submissionResultModelList = [];
		this._initSubmissionResultModelList(this._lookupResponse);
		console.log('[INFO] onResultFetched');
		console.log(this._lookupResponse);
		this._resultDataProvider.refresh(this._submissionResultModelList);
		// vscode.commands.executeCommand(ResultView._refreshResultCommand, this._submissionResultModelList);
	}

	private _initSubmissionResultModelList(lookupResponse: Judge0Response) {
		let k: keyof Judge0Response;
		for (k in lookupResponse) {
			if (lookupResponse[k] === null) {
				continue;
			}
			if (k === 'status') {
				this._submissionResultModelList.push(new SubmissionResultModel('Status', lookupResponse.status.description, lookupResponse.status.description.includes('Accepted') ? 'pass' : 'close'));
			}
			else if (k === 'memory') {
				this._submissionResultModelList.push(new SubmissionResultModel('Memory Used', lookupResponse[k] + ' KB', 'circuit-board'));
			}
			else if (k === 'time') {
				this._submissionResultModelList.push(new SubmissionResultModel('Time Used', lookupResponse[k] + ' ms', 'watch'));
			}
			else if (k === 'compile_output') {
				this._submissionResultModelList.push(new SubmissionResultModel('Compile Output',Buffer.from(lookupResponse[k]!, 'base64').toString('binary'), 'output'));
			}
			// else if (k === 'token') {
			// this._submissionResultModelList.push(new SubmissionResultModel('Submission Token',lookupResponse[k], 'key'));
			// }
			else {
				this._submissionResultModelList.push(new SubmissionResultModel(k, lookupResponse[k]));
			}
		}
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

	public refresh(submissionResultModelList: SubmissionResultModel[]): void {
		this._submissionResultModelList = submissionResultModelList;
		console.log(submissionResultModelList);
		this._onDidChangeTreeData.fire();
	}

	public getTreeItem(element: SubmissionResultModel): vscode.TreeItem {
		return {
			label: element.resultType + ': ' + element.resultValue,
			iconPath: element.resultIcon,
			collapsibleState: vscode.TreeItemCollapsibleState.None
		};
	}
	public getChildren(element?: SubmissionResultModel) {
		if (element) {
			return null;
		}
		return this._submissionResultModelList;
	}
}