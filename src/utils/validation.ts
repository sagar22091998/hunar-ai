import _ from 'lodash';
import { MCQQuestion, QuestionType, YesNoQuestion } from '../typings/app';

type ValidationResult = [boolean, string];

export const validateQuestions = (
    questions: QuestionType[],
): ValidationResult => {
    let validationMessage = '';
    let isValid = true;

    _.forEach(questions, (question, index) => {
        if (_.isEmpty(_.trim(question.question))) {
            validationMessage = `Question ${index + 1} is missing the "question" field.`;
            isValid = false;
            return false; // Exit iteration
        }

        if (question.type === 'MCQQuestion') {
            const mcqQuestion = question as MCQQuestion;
            if (
                _.isEmpty(mcqQuestion.options) ||
                mcqQuestion.options.length < 2
            ) {
                validationMessage = `Question ${index + 1} does not have more than one "option".`;
                isValid = false;
                return false; // Exit iteration
            }
        }

        if (question.type === 'YesNoQuestion') {
            const yesNoQuestion = question as YesNoQuestion;
            if (
                yesNoQuestion.subquestions?.present &&
                _.isEmpty(_.trim(yesNoQuestion.subquestions.question))
            ) {
                validationMessage = `Question ${index + 1} has a Sub Question with an empty "question" field.`;
                isValid = false;
                return false; // Exit iteration
            }
        }
    });

    return [isValid, validationMessage];
};
