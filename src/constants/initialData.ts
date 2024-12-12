/**
 * @author Sagar Bhattacharya
 * @description App Constants
 */

import { QuestionType } from '../typings/app';

export const INITIAL_QUESTION_DATA: Record<string, QuestionType> = {
    MCQQuestion: {
        type: 'MCQQuestion',
        question: '',
        options: [],
        answers: [],
    },
    TextQuestion: { type: 'TextQuestion', question: '' },
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
        imageName: '',
    },
};

export const QUESTION_TYPES_RADIO_DATA = [
    { value: 'MCQQuestion', label: 'Multiple Choice' },
    { value: 'TextQuestion', label: 'Free Text' },
    { value: 'YesNoQuestion', label: 'Yes/No Type' },
    { value: 'ImageQuestion', label: 'Image Based' },
];

export const INITIAL_QUESTION_DATA_FILLED: Record<string, QuestionType> = {
    MCQQuestion: {
        type: 'MCQQuestion',
        question: 'When we will win the league?',
        options: ['2022', '2023', '2024'],
        answers: ['2024'],
    },
    TextQuestion: { type: 'TextQuestion', question: 'Kya aap pagal hai?' },
    YesNoQuestion: {
        type: 'YesNoQuestion',
        question: 'Are you Ready',
        subquestions: {
            question: 'Pakka?',
            present: true,
        },
    },
    ImageQuestion: {
        type: 'ImageQuestion',
        question: 'Photo Accha Hai',
        desc: 'basiya',
        imageName: 'IMG_012',
    },
};
