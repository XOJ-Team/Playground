export type ApiConfig = {
    baseURL: string;
    secret?: string;
};

export const baseUrl = 'http://172.28.210.121:8080/';

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