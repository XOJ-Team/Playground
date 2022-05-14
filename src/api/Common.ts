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

// TODO: QuestionID should be number
export type StateDict = {
    sessionId: string | null;
    questionId: string;
    lang: string;
    langId: number;
    code: string;
    stdin: string;
    
    // Workspace States
    isLanguageSet: boolean;
};

export let globalState: StateDict = {
    sessionId: '',
    questionId: '',
    lang: 'c',
    langId: 52,
    code: '',
    stdin: '',
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
    question_id: number;
};

// export type Judge0SubmissionResponse = {
//     token: string;
// };

// export type Judge0LookupResponse = {
//     status_id: number | null;

//     status: {
//         id: number;
//         description: string;
//     };
//     time: string | null;
//     memory: number | null;
//     compile_output: string;
//     token: string;
// };

export type Judge0Response = {
    status: {
        id: number;
        description: string;
    };
    question_id: number;
    time: string | null;
    memory: number | null;
    stdout: string | null;
    compile_output: string | null;
    finished_at: string;
};

export type JudgeServerWrapper = {
    code: number;
    obj: Judge0Response | undefined;
};

export const Judge0LanguageId = new Map<string, number>([
    ['c', 50],
    ['cpp', 54],
    ['java', 62],
    ['python2', 70],
    ['python3', 71],
    ['go', 60]
]);