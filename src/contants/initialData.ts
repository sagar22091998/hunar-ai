import { QuestionType } from '../typings/app';

export const initialQuestionData: Record<string, QuestionType> = {
    YesNoQuestion: {
        type: 'YesNoQuestion',
        question: '',
        subquestions: {
            question: '',
            present: false,
        },
    },
    ImageQuestion: {
        type: 'ImageQuestion',
        question: '',
        desc: '',
    },
    MCQQuestion: {
        type: 'MCQQuestion',
        question: '',
        options: [],
        answers: [],
    },
    TextQuestion: { type: 'TextQuestion', question: '' },
};

export const questionTypesRadioData = [
    { value: 'MCQQuestion', label: 'Multiple Choice' },
    { value: 'TextQuestion', label: 'Free Text' },
    { value: 'YesNoQuestion', label: 'Yes/No Type' },
    { value: 'ImageQuestion', label: 'Image Based' },
];
