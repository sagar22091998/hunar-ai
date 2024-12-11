import React, { useState } from 'react';
import {
    Alert,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import _ from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';

import { QuestionType } from './typings/app';
import {
    initialQuestionData,
    questionTypesRadioData,
} from './contants/initialData';
import { validateQuestions } from './utils/validation';
import { MultipleChoiceForm } from './components/QuestionForms/MultipleChoiceForm';
import { YesNoForm } from './components/QuestionForms/YesNoForm';
import { HunarButton } from './components/utilities/HunarButton';
import { ImageForm } from './components/QuestionForms/ImageForm';

const App: React.FC = () => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [open, setOpen] = useState('');

    const handleAlert = () => {
        setTimeout(() => setOpen(''), 1000);
    };

    const handleAddQuestion = () => {
        dada(questions);
    };

    const dada = (questions: QuestionType[]) => {
        const allValid = validateQuestions(questions);

        if (allValid[0]) {
            setQuestions([
                ...questions,
                structuredClone(initialQuestionData['MCQQuestion']),
            ]);

            console.log('No Issues');
        } else {
            setOpen(allValid[1]);
        }
    };

    const handleQuestionTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const { value } = event.target;

        const newFields = [...questions];
        newFields[index] = structuredClone(initialQuestionData[value]);
        setQuestions(newFields);
    };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
    ) => {
        const { name, value } = event.target;

        const newFields = [...questions];
        _.set(newFields, `[${index}][${name}]`, value);
        setQuestions(newFields);
    };

    const handleRemoveFields = (index: number) => {
        const values = [...questions];
        values.splice(index, 1);
        setQuestions(values);
    };

    const renderFieldByType = (inputField: QuestionType, index: number) => {
        switch (inputField.type) {
            case 'MCQQuestion':
                return (
                    <MultipleChoiceForm
                        questions={questions}
                        setQuestions={setQuestions}
                        index={index}
                        questionInfo={inputField}
                    />
                );
            case 'YesNoQuestion':
                return (
                    <YesNoForm
                        questions={questions}
                        setQuestions={setQuestions}
                        index={index}
                        questionInfo={inputField}
                    />
                );
            case 'TextQuestion':
                return <></>;
            case 'ImageQuestion':
                return (
                    <ImageForm
                        questions={questions}
                        setQuestions={setQuestions}
                        index={index}
                        questionInfo={inputField}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className='hunar'>
            <div className='hunar--sidebar'>Sidebar</div>
            <div className='hunar--content'>
                <div className='hunar--content--cotainer'>
                    <h6>Qualification Questions</h6>
                    <form>
                        {questions.map((inputField, index) => {
                            return (
                                <div className='flex-column'>
                                    <div
                                        style={{
                                            padding: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography>
                                            Question {index + 1}
                                        </Typography>
                                        <IconButton
                                            onClick={() =>
                                                handleRemoveFields(index)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <RadioGroup
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                        name='type'
                                        defaultValue={inputField.type}
                                        onChange={(e) =>
                                            handleQuestionTypeChange(e, index)
                                        }
                                        value={inputField.type}
                                    >
                                        {questionTypesRadioData.map((type) => (
                                            <FormControlLabel
                                                key={type.value}
                                                value={type.value}
                                                control={<Radio />}
                                                label={type.label}
                                            />
                                        ))}
                                    </RadioGroup>

                                    {inputField.type !== 'ImageQuestion' && (
                                        <TextField
                                            id='outlined-required'
                                            name='question'
                                            required
                                            onChange={(e) =>
                                                handleTextChange(e, index)
                                            }
                                            label='Add your question here'
                                            value={inputField.question}
                                        />
                                    )}
                                    {renderFieldByType(inputField, index)}
                                </div>
                            );
                        })}
                    </form>
                    <HunarButton
                        buttonText='Add Question'
                        handleFunction={handleAddQuestion}
                        buttonType='secondary'
                    />
                    <Snackbar
                        open={!!open}
                        autoHideDuration={3000}
                        onClose={handleAlert}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={handleAlert}
                            variant='filled'
                            severity='error'
                        >
                            {open}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    );
};

export default App;
