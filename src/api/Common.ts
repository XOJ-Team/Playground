/* eslint-disable @typescript-eslint/naming-convention */

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
    questionId: string;
    lang: string;
    langId: number;
    code: string;

    // Workspace States
    isLanguageSet: boolean;
};

export let globalState: StateDict = {
    sessionId: '',
    questionId: '',
    lang: 'cpp',
    langId: 52,
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
    status_id: number | null;

    status: {
        id: number;
        description: string;
    };
    
    time: string | null;
    memory: number | null;
    compile_output: string;
};

