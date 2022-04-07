export type ApiConfig = {
    baseURL: string;
    secret?: string;
};

export type ApiConnection = {
    status: boolean;
    time: Date;
};

export type SubmissionObject = {
    questionId: string;
    questionName: string;
    userId: string;
    lang: string;
    code: string;
};

export type QuestionObject = {
    questionId: string;
    name: string;
    questionLevel: string;
    levelDescription: string;
    content: string;
};