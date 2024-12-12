/**
 * @author Sagar Bhattacharya
 * @description New Add Job Query Component
 */

import React, { useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import _ from 'lodash';
import {
    FormControl,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';

import DisplayError, { DisplayErrorHandle } from './utilities/DisplayError';
import DisplaySuccess, {
    DisplaySuccessHandle,
} from './utilities/DisplaySucess';
import { HunarButton } from './utilities/HunarButton';
import { QuestionFormData } from './QuestionForms/QuestionFormData';
import { QuestionType } from '../typings/app';
import {
    INITIAL_QUESTION_DATA,
    QUESTION_TYPES_RADIO_DATA,
} from '../constants/initialData';
import { validateQuestions } from '../utils/validation';

interface IProps {
    setAllJobQueries: React.Dispatch<React.SetStateAction<QuestionType[][]>>;
}

const AddJobQuery: React.FC<IProps> = ({ setAllJobQueries }) => {
    const [questions, setQuestions] = useState<QuestionType[]>([
        _.cloneDeep(INITIAL_QUESTION_DATA['MCQQuestion']),
    ]);
    const [errorText, setErrorText] = useState('');

    const displayErrorRef = useRef<DisplayErrorHandle>(null);
    const displaySuccessRef = useRef<DisplaySuccessHandle>(null);

    const handleAddQuestion = () => {
        const allValid = validateQuestions(questions);
        if (allValid[0]) {
            setQuestions([
                ...questions,
                structuredClone(INITIAL_QUESTION_DATA['MCQQuestion']),
            ]);
        } else {
            displayErrorRef.current?.displayError();
            setErrorText(allValid[1]);
        }
    };

    const handleSaveJobQuery = () => {
        const allValid = validateQuestions(questions);
        if (allValid[0]) {
            setAllJobQueries((prevQueries) => [...prevQueries, questions]);

            // Reset
            setQuestions([_.cloneDeep(INITIAL_QUESTION_DATA['MCQQuestion'])]);
            displaySuccessRef.current?.displaySuccess();
        } else {
            displayErrorRef.current?.displayError();
            setErrorText(allValid[1]);
        }
    };

    const handleQuestionTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const { value } = event.target;

        const newQuestions = [...questions];
        newQuestions[index] = _.cloneDeep(INITIAL_QUESTION_DATA[value]);
        setQuestions(newQuestions);
    };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
    ) => {
        const { name, value } = event.target;

        const newQuestions = [...questions];
        _.set(newQuestions, `[${index}][${name}]`, value);
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    return (
        <div className='add-job'>
            <header className='add-job--header'>
                <Typography variant='h6'>Create a New Job Query</Typography>
            </header>
            <div className='add-job--content'>
                <Typography variant='h6'>Qualifications Questions</Typography>
                <FormControl className='w-100'>
                    {_.map(questions, (questionItem, index) => {
                        return (
                            <div key={index}>
                                <div className='flex-center-between'>
                                    <Typography>
                                        Question {index + 1}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            handleRemoveQuestion(index)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                                <RadioGroup
                                    sx={radioGroupStyling}
                                    name='type'
                                    defaultValue={questionItem.type}
                                    onChange={(e) =>
                                        handleQuestionTypeChange(e, index)
                                    }
                                    value={questionItem.type}
                                >
                                    {_.map(
                                        QUESTION_TYPES_RADIO_DATA,
                                        ({ label, value }) => (
                                            <FormControlLabel
                                                key={value}
                                                value={value}
                                                control={<Radio />}
                                                label={label}
                                            />
                                        ),
                                    )}
                                </RadioGroup>
                                {/* Ordering is different in ImageQuestion for Question Field */}
                                {questionItem.type !== 'ImageQuestion' && (
                                    <TextField
                                        className='w-100'
                                        id='outlined-required'
                                        name='question'
                                        required
                                        onChange={(e) =>
                                            handleTextChange(e, index)
                                        }
                                        label='Add your question here'
                                        value={questionItem.question}
                                    />
                                )}
                                <QuestionFormData
                                    questionInfo={questionItem}
                                    index={index}
                                    questions={questions}
                                    setQuestions={setQuestions}
                                />
                            </div>
                        );
                    })}
                </FormControl>
                <DisplayError ref={displayErrorRef} message={errorText} />
                <DisplaySuccess
                    ref={displaySuccessRef}
                    message='Success! Check Jobs Page'
                />
                <HunarButton
                    buttonText='Add Question'
                    handleFunction={handleAddQuestion}
                    buttonType='secondary'
                />
            </div>
            <div className='add-job--footer'>
                <HunarButton
                    buttonText='Save Job Query'
                    handleFunction={handleSaveJobQuery}
                    buttonType='primary'
                />
            </div>
        </div>
    );
};

const radioGroupStyling = {
    display: 'flex',
    flexDirection: 'row',
    '@media screen and (max-width: 1023px)': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    },
};

export default AddJobQuery;
