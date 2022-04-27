
import * as vscode from 'vscode';

import { SubmissionObject } from '../api/Common';
import { Judge0LookupResponse } from '../api/Common';
import {JudgeServer} from '../api/Judge';
export class ResultView {

    private static readonly _viewType = 'playground.panel.resultView';
	//TODO: Replace with event/command
	private _lookupResponse: Judge0LookupResponse = { "source_code": "I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBu\nYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxv\nLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=\n", "language_id": 52, "stdin": "SnVkZ2Uw\n", "expected_output": null, "stdout": "aGVsbG8sIEp1ZGdlMAo=\n", "status_id": 3, "created_at": "2022-04-26T06:21:10.628Z", "finished_at": "2022-04-26T06:21:11.129Z", "time": "0.002", "memory": 784, "stderr": null, "token": "d5a8085e-34ce-4230-af5b-c22fee673b22", "number_of_runs": 1, "cpu_time_limit": "5.0", "cpu_extra_time": "1.0", "wall_time_limit": "10.0", "memory_limit": 128000, "stack_limit": 64000, "max_processes_and_or_threads": 60, "enable_per_process_and_thread_time_limit": false, "enable_per_process_and_thread_memory_limit": false, "max_file_size": 1024, "compile_output": null, "exit_code": 0, "exit_signal": null, "message": null, "wall_time": "0.033", "compiler_options": null, "command_line_arguments": null, "redirect_stderr_to_stdout": false, "callback_url": null, "additional_files": null, "enable_network": false, "status": { "id": 3, "description": "Accepted" }, "language": { "id": 52, "name": "C++ (GCC 7.4.0)" } } as Judge0LookupResponse;
    constructor(private readonly _extensionContext: vscode.ExtensionContext) {
		const view = vscode.window.createTreeView(ResultView._viewType, { treeDataProvider: new ResultDataProvider(this._lookupResponse), showCollapseAll: true });
		_extensionContext.subscriptions.push(view);
    }

}

export class SubmissionResultModel{
    // public readonly result: Judge0LookupResponse;
	public readonly resultType: string;
	public readonly resultValue?: any;
	public readonly resultIcon: string = '$(check)';
    constructor(resultType: string, resultValue?: any, resultIcon?: string){
        this.resultType = resultType;
		this.resultValue = resultValue;
		this.resultIcon = resultIcon || '$(check)';
    }
}


 export class ResultDataProvider implements vscode.TreeDataProvider<SubmissionResultModel> {

    private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
    readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;
    private _submissionResultModelList: SubmissionResultModel[] = [];
	private _initSubmissionResultModelList(lookupResponse: Judge0LookupResponse) {
		let k : keyof Judge0LookupResponse;
		for (k in lookupResponse) {
			this._submissionResultModelList.push(new SubmissionResultModel(k, lookupResponse[k]));
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
			label: element.resultType+': '+element.resultValue,
			iconPath: element.resultIcon
		};
    }
    public getChildren(element?: SubmissionResultModel) {
		if (element) {
			return null;
		}
		return this._submissionResultModelList;
    }
}