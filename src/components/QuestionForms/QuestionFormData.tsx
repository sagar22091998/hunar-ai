/**
 * @author Sagar Bhattacharya
 * @description Job Query Form Data Differentiation Component
 */

import React from 'react';

import { ImageForm } from './ImageForm';
import { MultipleChoiceForm } from './MultipleChoiceForm';
import { QuestionType } from '../../typings/app';
import { YesNoForm } from './YesNoForm';

interface IProps {
    questionInfo: QuestionType;
    index: number;
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

export const QuestionFormData: React.FC<IProps> = (props) => {
    const { questionInfo, ...delegated } = props;
    if (questionInfo.type === 'MCQQuestion') {
        return (
            <MultipleChoiceForm questionInfo={questionInfo} {...delegated} />
        );
    }

    if (questionInfo.type === 'YesNoQuestion') {
        return <YesNoForm questionInfo={questionInfo} {...delegated} />;
    }

    if (questionInfo.type === 'TextQuestion') {
        return <></>;
    }

    if (questionInfo.type === 'ImageQuestion') {
        return <ImageForm questionInfo={questionInfo} {...delegated} />;
    }

    return null;
};
