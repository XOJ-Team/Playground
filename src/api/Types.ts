import { StatusBarAlignment } from "vscode";

export const extUserAgent = 'xoj-playground';

export type ConnectionStatus = {
    status: boolean;
    comment: string;
    obj: Date;
};

export type WebSession = {
    userId: string;
    questionId: string;
    sessionId: string;
};

export type StateDict = {
    sessionId: string | null;
    questionId: string | null;
    lang: string;
    code: string;

    // Workspace States
    isLanguageSet: boolean;
};

export let state: StateDict = {
	sessionId: '',
	questionId: '',
	lang: 'c',
	code: '',
    isLanguageSet: false
};

export type SubmissionObject = {
    questionId: string;
    questionName: string;
    userId: string;
    lang: string;
    code: string;
};

export type QuestionObject = {
    status: string;
    comment: string;
    obj: {
        // Metadata
        id: string;
        name: string;
        content: string;
        memoryLimit: number;
        timeLimit: number;
        questionLevel: number;
        levelDescription: string;
        rate: number;
        accept: number;
        total: number;

        // Other Props
        createTime: Date;
        creator: string;
        creatorName: string;

        modifier?: string;
        modifierName?: string;
        modifyTime?: Date;

        isDelete: boolean;
        deleteTime: Date;
        isHide: boolean;

        tags: string;
    }
};

export type Judge0SubmissionRequest = {
    source_code: string;
    language_id: number;
    stdin?: string;
    expected_output?: string;
};

export type Judge0SubmissionResponse = {
    token: string;
};

export type Judge0LookupResponse = {
    // Maybe not?
    status_id?: string;

    status: {
        id: string;
        description: string;
    };
    
    time?: string;
    memory?: string;
    compile_output?: string;

};