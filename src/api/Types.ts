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
