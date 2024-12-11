// import {
//     Autocomplete,
//     AutocompleteRenderInputParams,
//     Checkbox,
//     Chip,
//     FormControl,
//     Input,
//     TextField,
//     Typography,
// } from '@mui/material';
import React from 'react';
import { QuestionType, YesNoQuestion } from '../../typings/app';
import { IconButton, TextField, Typography } from '@mui/material';
import { HunarButton } from '../utilities/HunarButton';
import DeleteIcon from '@mui/icons-material/Delete';

import _ from 'lodash';

// import _ from 'lodash';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface IProps {
    index: number;
    questionInfo: YesNoQuestion;
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

export const YesNoForm: React.FC<IProps> = ({
    questionInfo,
    questions,
    index,
    setQuestions,
}) => {
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
        const { value } = event.target;

        const newFields = [...questions];
        _.set(newFields, `[${index}]['subquestions']['question']`, value);
        setQuestions(newFields);
    };

    return (
        <div className='flex-column'>
            <Typography
                style={{
                    fontSize: '12px',
                    color: '#b0b0b0',
                    marginBottom: '4px',
                }}
            >
                'YES' the qualifying answer in this type of question and it is
                always acompained by a sub question.
            </Typography>
            <div>
                {questionInfo.subquestions.present ? (
                    <>
                        <div
                            style={{
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography>Sub Question</Typography>
                            <IconButton onClick={removeSubQuestion}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <TextField
                            id='outlined-required'
                            required
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
