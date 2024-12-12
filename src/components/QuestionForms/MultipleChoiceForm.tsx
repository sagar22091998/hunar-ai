/**
 * @author Sagar Bhattacharya
 * @description Form Data for MCQ Type Questions
 */

import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import _ from 'lodash';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    Checkbox,
    Chip,
    FormControl,
    Input,
    TextField,
    Typography,
} from '@mui/material';

import { MCQQuestion, QuestionType } from '../../typings/app';

interface IProps {
    index: number;
    questionInfo: MCQQuestion;
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

export const MultipleChoiceForm: React.FC<IProps> = (props) => {
    const { questionInfo, questions, index, setQuestions } = props;

    // To filter from Answers if Option is removed
    const fieldCheck = (param: AutocompleteRenderInputParams) => {
        const newParam = param;
        if (_.isArray(newParam.InputProps.startAdornment)) {
            newParam.InputProps.startAdornment = _.filter(
                newParam.InputProps.startAdornment,
                (item) => _.includes(questionInfo.options, item.props.label),
            );
        }

        return newParam;
    };

    const handleChangeAnswer = (answers: string[], index: number) => {
        const newQuestion = [...questions];
        _.set(newQuestion, `[${index}]['answers']`, answers);
        setQuestions(newQuestion);
    };

    const handleAddOptions = (
        event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
    ) => {
        const newItem = (event.target as HTMLInputElement).value.trim();
        if (newItem && event.code === 'Enter') {
            const newItem = (event.target as HTMLInputElement).value;
            const newQuestion = [...questions];
            const currentOptions = _.get(
                newQuestion,
                `[${index}]['options']`,
                [] as string[],
            );

            if (!_.includes(currentOptions, newItem)) {
                currentOptions.push(newItem);
                _.set(newQuestion, `[${index}]['options']`, currentOptions);
                setQuestions(newQuestion);
            }

            (event.target as HTMLInputElement).value = '';
        }
    };

    // Handler called for Mobile Devices [See onBlur Note in Input Field]
    const handleAddOptionsMobile = (value: string, index: number) => {
        if (value === '') return;

        const newItem = value.trim();
        const newQuestion = [...questions];
        const currentOptions = _.get(
            newQuestion,
            `[${index}]['options']`,
            [] as string[],
        );

        if (!_.includes(currentOptions, newItem)) {
            currentOptions.push(newItem);
            _.set(newQuestion, `[${index}]['options']`, currentOptions);
            setQuestions(newQuestion);
        }
    };

    const handleDelete = (item: string, index: number) => {
        const newQuestion = [...questions];
        const currentOptions = _.get(newQuestion, `[${index}]['options']`, []);
        const currentAnswers = _.get(newQuestion, `[${index}]['answers']`, []);

        const newOptions = _.filter(currentOptions, (x) => x !== item);
        const newAnswers = _.filter(currentAnswers, (x) => x !== item);

        _.set(newQuestion, `[${index}]['options']`, newOptions);
        _.set(newQuestion, `[${index}]['answers']`, newAnswers);
        setQuestions(newQuestion);
    };

    return (
        <div className='mcq-question-type'>
            <FormControl sx={customMultiTextFieldWrapperStyle}>
                {questionInfo.options.length > 0 && (
                    <div className='multiselect-label'>
                        Type Options (Minimun 2)
                    </div>
                )}
                <>
                    {_.map(questionInfo.options, (item, chipIndex) => (
                        <Chip
                            key={chipIndex}
                            style={chipStyle}
                            size='small'
                            onDelete={() => handleDelete(item, index)}
                            label={item}
                        />
                    ))}
                </>
                <Input
                    sx={customMultiTextFieldStyle}
                    placeholder='Type Options (Minimun 2)'
                    onBlur={(e) => {
                        // In case of Mobile/Tab Device being used 'onKeyDown' never triggers [Adding below logic to add Options if using application on Mobile]
                        if (/Mobi|Android/i.test(navigator.userAgent)) {
                            handleAddOptionsMobile(e.target.value, index);
                        }

                        e.target.value = '';
                    }}
                    onKeyDown={(e) => handleAddOptions(e, index)}
                />
            </FormControl>
            <Typography
                className='font-color-dark-gray'
                style={subInfoTextStyle}
            >
                Type and press 'Enter' to create multiple Options
            </Typography>
            <Autocomplete
                multiple
                options={questionInfo.options}
                getOptionLabel={(option) => option}
                onChange={(_, newValue) => {
                    handleChangeAnswer(newValue, index);
                }}
                renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            <Checkbox
                                icon={
                                    <CheckBoxOutlineBlankIcon fontSize='small' />
                                }
                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    );
                }}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...fieldCheck(params)}
                            label='Pick Qualifying Answers'
                            placeholder='Pick Qualifying Answers'
                        />
                    );
                }}
            />
        </div>
    );
};

const customMultiTextFieldWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    border: '1px solid #b0b0b0',
    borderRadius: '4px',
    padding: '12px 8px',
};

const customMultiTextFieldStyle = {
    margin: '0 10px',
    width: '300px',
};

const chipStyle = {
    padding: '4px',
    margin: '2px',
    fontSize: '16px',
};

const subInfoTextStyle = { fontSize: '12px', margin: '4px 0px' };
