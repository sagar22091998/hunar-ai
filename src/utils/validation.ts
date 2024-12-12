/**
 * @author Sagar Bhattacharya
 * @description Questions Validations Utility
 */

import _ from 'lodash';
import {
    ImageQuestion,
    MCQQuestion,
    QuestionType,
    YesNoQuestion,
} from '../typings/app';

type ValidationResult = [boolean, string];

export const validateQuestions = (
    questions: QuestionType[],
): ValidationResult => {
    let validationMessage = '';
    let isValid = true;

    _.forEach(questions, (question, index) => {
        if (_.isEmpty(_.trim(question.question))) {
            validationMessage = `Question field is empty for Question ${index + 1}.`;
            isValid = false;
            return false;
        }

        if (question.type === 'MCQQuestion') {
            const mcqQuestion = question as MCQQuestion;
            if (
                _.isEmpty(mcqQuestion.options) ||
                mcqQuestion.options.length < 2
            ) {
                validationMessage = `Question ${index + 1} does not have two or more Options.`;
                isValid = false;
                return false;
            }

            if (_.isEmpty(mcqQuestion.answers)) {
                validationMessage = `Question ${index + 1} does not have any Answer(s).`;
                isValid = false;
                return false;
            }
        }

        if (question.type === 'YesNoQuestion') {
            const yesNoQuestion = question as YesNoQuestion;
            if (
                yesNoQuestion.subquestions?.present &&
                _.isEmpty(_.trim(yesNoQuestion.subquestions.question))
            ) {
                validationMessage = `Sub-Question field is empty for Question ${index + 1}.`;
                isValid = false;
                return false;
            }
        }

        if (question.type === 'ImageQuestion') {
            const imageQuestion = question as ImageQuestion;
            if (_.isEmpty(_.trim(imageQuestion.desc))) {
                validationMessage = `Description field is empty for Question ${index + 1}.`;
                isValid = false;
                return false;
            }

            if (_.isEmpty(_.trim(imageQuestion.imageName))) {
                validationMessage = `Please Select Image/File for Question ${index + 1}.`;
                isValid = false;
                return false;
            }
        }
    });

    return [isValid, validationMessage];
};
