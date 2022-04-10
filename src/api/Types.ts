export type ConnectionStatus = {
    status: boolean;
    comment: string;
    obj: Date;
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