interface BaseQuestion {
    type: 'MCQQuestion' | 'TextQuestion' | 'YesNoQuestion' | 'ImageQuestion';
    question: string;
}

interface MCQQuestion extends BaseQuestion {
    type: 'MCQQuestion';
    options: string[];
    answers: string[];
}

interface TextQuestion extends BaseQuestion {
    type: 'TextQuestion';
}

interface YesNoQuestion extends BaseQuestion {
    type: 'YesNoQuestion';
    subquestions: {
        present: boolean;
        question: string;
    };
}

interface ImageQuestion extends BaseQuestion {
    type: 'ImageQuestion';
    desc: string;
    fileData?: FileList;
}

export type QuestionType =
    | MCQQuestion
    | TextQuestion
    | YesNoQuestion
    | ImageQuestion;
