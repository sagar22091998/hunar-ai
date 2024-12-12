/**
 * @author Sagar Bhattacharya
 * @description Form Data for Yes/No Type Questions
 */

import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import _ from 'lodash';
import { IconButton, TextField, Typography } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import { HunarButton } from '../utilities/HunarButton';
import { QuestionType, YesNoQuestion } from '../../typings/app';

interface IProps {
    index: number;
    questionInfo: YesNoQuestion;
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

export const YesNoForm: React.FC<IProps> = (props) => {
    const { questionInfo, questions, index, setQuestions } = props;

    const handleAddSubQuestion = () => {
        const newQuestions = [...questions];
        _.set(newQuestions, `[${index}]['subquestions']['present']`, true);
        setQuestions(newQuestions);
    };

    const removeSubQuestion = () => {
        const newQuestions = [...questions];
        _.set(newQuestions, `[${index}]['subquestions']['present']`, false);
        _.set(newQuestions, `[${index}]['subquestions']['question']`, '');
        setQuestions(newQuestions);
    };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;

        const newQuestions = [...questions];
        _.set(newQuestions, `[${index}]['subquestions'][${name}`, value);
        setQuestions(newQuestions);
    };

    return (
        <div className='flex-column'>
            <Typography
                className='font-color-dark-gray'
                style={subInfoTextStyle}
            >
                'YES' the qualifying answer in this type of question and it is
                always acompained by a sub question.
            </Typography>
            <div>
                {questionInfo.subquestions.present ? (
                    <>
                        <div className='flex-center-between'>
                            <Typography>
                                <SubdirectoryArrowRightIcon
                                    style={subQuestionIconStyle}
                                />
                                Sub Question
                            </Typography>
                            <IconButton onClick={removeSubQuestion}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <TextField
                            className='w-100'
                            required
                            name='question'
                            onChange={handleTextChange}
                            label='Add your Sub Question here'
                            value={questionInfo.subquestions.question}
                        />
                    </>
                ) : (
                    <HunarButton
                        handleFunction={handleAddSubQuestion}
                        buttonText='Add Sub Question'
                        buttonType='tertiary'
                        disabled={!(questionInfo.question.length > 0)}
                    />
                )}
            </div>
        </div>
    );
};

const subInfoTextStyle = { fontSize: '12px', marginTop: '8px' };
const subQuestionIconStyle = { fontSize: '16px' };
