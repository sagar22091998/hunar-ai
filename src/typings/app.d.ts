/**
 * @author Sagar Bhattacharya
 * @description App Types
 */

type MCQQuestion = {
    type: 'MCQQuestion';
    question: string;
    options: string[];
    answers: string[];
};

type TextQuestion = {
    type: 'TextQuestion';
    question: string;
};

type YesNoQuestion = {
    type: 'YesNoQuestion';
    question: string;
    subquestions: {
        present: boolean;
        question: string;
    };
};

type ImageQuestion = {
    type: 'ImageQuestion';
    question: string;
    desc: string;
    imageName: string;
};

export type QuestionType =
    | MCQQuestion
    | TextQuestion
    | YesNoQuestion
    | ImageQuestion;
