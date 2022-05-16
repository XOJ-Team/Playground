
import { runInThisContext } from 'vm';
import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Common';
import { JudgeServerWrapper } from '../api/Common';
import { Judge0Response } from '../api/Common';
import { JudgeServer } from '../api/Judge';


export class ResultView {
	private _disposable: vscode.Disposable;
	private static readonly _showResultCommand = 'xoj-playground.showResult';
	// private static readonly _refreshResultCommand = 'xoj-playground.refreshResult';
	private static readonly _viewType = 'playground.panel.resultView';
	private _submissionResultModelList: SubmissionResultModel[] = [];
	private _submissionResultModelChildren: Map<SubmissionResultModel, SubmissionResultModel[]> = new Map<SubmissionResultModel, SubmissionResultModel[]>();
	private _resultDataProvider = new ResultDataProvider(this._submissionResultModelList, this._submissionResultModelChildren);

	private _lookupResponse: Judge0Response = {} as Judge0Response;

	constructor(private readonly _extensionContext: vscode.ExtensionContext) {
		this._disposable = vscode.commands.registerCommand(ResultView._showResultCommand, this.onResultFetched, this);
		_extensionContext.subscriptions.push(this._disposable);

		// this._disposable = vscode.commands.registerCommand(ResultView._refreshResultCommand, this._resultDataProvider.refresh, this);
		// _extensionContext.subscriptions.push(this._disposable);

		this._disposable = vscode.window.createTreeView(ResultView._viewType, { treeDataProvider: this._resultDataProvider, showCollapseAll: false });
		_extensionContext.subscriptions.push(this._disposable);
	}

	private onResultFetched(res: Judge0Response) {
		this._lookupResponse = res;
		let submissionResultModelChildrenItem: SubmissionResultModel[] = [];;
		this._initSubmissionResultModelList(this._lookupResponse, submissionResultModelChildrenItem);
		let currentSubmissionParent: SubmissionResultModel = this._getSubmissionResultParent(this._lookupResponse);
		if (this._submissionResultModelList.length !== 0) { this._submissionResultModelList[0].isTop = false; };
		currentSubmissionParent.isTop = true;
		this._submissionResultModelList.unshift(currentSubmissionParent);
		this._submissionResultModelChildren.set(currentSubmissionParent, submissionResultModelChildrenItem);
		console.log('[INFO] onResultFetched');
		console.log(this._lookupResponse);
		this._resultDataProvider.refresh(this._submissionResultModelList, this._submissionResultModelChildren);
		// vscode.commands.executeCommand(ResultView._refreshResultCommand, this._submissionResultModelList);
	}


	private _getSubmissionResultParent(lookupResponse: Judge0Response) {
		return new SubmissionResultModel((lookupResponse.status.description.includes('Accepted') ? 'Accepted' : 'Failed') + ' at Time',
			new Date(lookupResponse.finished_at).toLocaleString(),
			lookupResponse.status.description.includes('Accepted') ? 'pass' : 'error',
			lookupResponse.status.description.includes('Accepted') ? new vscode.ThemeColor("terminal.ansiGreen") : new vscode.ThemeColor("notificationsErrorIcon.foreground"),
			true);
	}


	private _initSubmissionResultModelList(lookupResponse: Judge0Response, submissionResultModelChildrenItem: SubmissionResultModel[]) {
		let k: keyof Judge0Response;
		for (k in lookupResponse) {
			if (lookupResponse[k] === null) {
				continue;
			}
			if (k === 'question_id') {
				submissionResultModelChildrenItem.push(new SubmissionResultModel('Question ID', lookupResponse[k], 'list-ordered'));
			}
			else if (k === 'status') {
				submissionResultModelChildrenItem.push(new SubmissionResultModel('Status', lookupResponse.status.description,
					lookupResponse.status.description.includes('Accepted') ? 'pass' : 'error',
					lookupResponse.status.description.includes('Accepted') ? new vscode.ThemeColor("terminal.ansiGreen") : new vscode.ThemeColor("notificationsErrorIcon.foreground")));
			}
			else if (k === 'memory') {
				submissionResultModelChildrenItem.push(new SubmissionResultModel('Memory', lookupResponse[k] + ' KB', 'circuit-board'));
			}
			else if (k === 'time') {
				submissionResultModelChildrenItem.push(new SubmissionResultModel('Time Used', lookupResponse[k] + ' ms', 'watch'));
			}
			else if (k === 'compile_output') {
				submissionResultModelChildrenItem.push(new SubmissionResultModel('Compile Output', Buffer.from(lookupResponse[k]!, 'base64').toString('binary'), 'clear-all'));
			}
			else if (k === 'stdout') {
				submissionResultModelChildrenItem.push(new SubmissionResultModel('Standard Output', Buffer.from(lookupResponse[k]!, 'base64').toString('binary'), 'output'));
			}
			else if (k === 'finished_at') {
				submissionResultModelChildrenItem.push(new SubmissionResultModel('Finished At', new Date(lookupResponse.finished_at).toLocaleString(), 'history', undefined));
			}
			else {
				submissionResultModelChildrenItem.push(new SubmissionResultModel(k, lookupResponse[k]));
			}
		}
	}
}

export class SubmissionResultModel {
	// public readonly result: Judge0LookupResponse;
	public readonly resultType: string;
	public readonly resultValue?: any;
	public readonly resultIcon: vscode.ThemeIcon;
	public readonly hasChildren: boolean;
	public isTop: boolean;
	constructor(resultType: string, resultValue?: any, resultIcon?: string, color?: vscode.ThemeColor, hasChildren?: boolean, isTop?: boolean) {
		this.resultType = resultType;
		this.resultValue = resultValue;
		this.resultIcon = resultIcon ? new vscode.ThemeIcon(resultIcon, color) : new vscode.ThemeIcon("info");
		this.hasChildren = hasChildren ? hasChildren : false;
		this.isTop = isTop ? isTop : false;
	}
}


export class ResultDataProvider implements vscode.TreeDataProvider<SubmissionResultModel> {

	private _onDidChangeTreeData: vscode.EventEmitter<SubmissionResultModel[] | undefined | null | void> = new vscode.EventEmitter<SubmissionResultModel[] | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<SubmissionResultModel[] | undefined | null | void> = this._onDidChangeTreeData.event;
	private _submissionResultModelList: SubmissionResultModel[] = [];
	private _submissionResultModelChildren: Map<SubmissionResultModel, SubmissionResultModel[]>;

	constructor(private readonly submissionResultModelList: SubmissionResultModel[], private submissionResultModelChildren: Map<SubmissionResultModel, SubmissionResultModel[]>) {
		this._submissionResultModelList = submissionResultModelList;
		this._submissionResultModelChildren = submissionResultModelChildren;
	}

	public refresh(submissionResultModelList: SubmissionResultModel[], submissionResultModelChildren: Map<SubmissionResultModel, SubmissionResultModel[]>): void {
		this._submissionResultModelList = submissionResultModelList;
		this._submissionResultModelChildren = submissionResultModelChildren;
		console.log(submissionResultModelList);
		this._onDidChangeTreeData.fire();
	}

	public getTreeItem(element: SubmissionResultModel): vscode.TreeItem {
		return {
			label: element.resultType + ': ' + element.resultValue,
			iconPath: element.resultIcon,
			collapsibleState: function () {
				if (element.hasChildren) {
					console.log(element.resultType + element.resultValue!+'hasChildren' + "isTop?"+element.isTop);
					if (element.isTop === true) {
						console.log("[INFO] Triggered Top for "+ element.resultType + element.resultValue!);
						return vscode.TreeItemCollapsibleState.Expanded;
					}
					else{
						console.log("[INFO] Triggered NOT Top for "+ element.resultType + element.resultValue!);
						return vscode.TreeItemCollapsibleState.None;
						//TODO: should be below
						return vscode.TreeItemCollapsibleState.Collapsed;
					}
				}
				else {
					return vscode.TreeItemCollapsibleState.None;
				}
			}.apply(this),
			// element.hasChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None,
		};
	}
	public getChildren(element?: SubmissionResultModel) {
		if (element === null || element === undefined) {
			return this._submissionResultModelList;
		}
		else if (element?.hasChildren) {
			return this._submissionResultModelChildren.get(element);
		}
	}
}