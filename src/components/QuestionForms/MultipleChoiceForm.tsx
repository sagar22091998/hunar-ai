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
import React from 'react';
import { MCQQuestion, QuestionType } from '../../typings/app';
import _ from 'lodash';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface IProps {
    index: number;
    questionInfo: MCQQuestion;
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export const MultipleChoiceForm: React.FC<IProps> = ({
    index,
    questionInfo,
    questions,
    setQuestions,
}) => {
    const fieldCheck = (param: AutocompleteRenderInputParams) => {
        const newParam = param;
        if (_.isArray(newParam.InputProps.startAdornment)) {
            newParam.InputProps.startAdornment =
                newParam.InputProps.startAdornment.filter((item) => {
                    return questionInfo.options.includes(item.props.label);
                });
        }

        return newParam;
    };

    const handleChangeAnswer = (answers: string[], index: number) => {
        const newFields = [...questions];
        _.set(newFields, `[${index}]['answers']`, answers);
        setQuestions(newFields);
    };

    const handleAddOptions = (
        event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
    ) => {
        const newItem = (event.target as HTMLInputElement).value;

        if (newItem && (event.code === 'Enter' || event.code === 'Space')) {
            const newItem = (event.target as HTMLInputElement).value;
            const newFields = [...questions];
            const currentOptions = _.get(
                newFields,
                `[${index}]['options']`,
                [] as string[],
            );

            if (currentOptions.indexOf(newItem) !== -1) {
                (event.target as HTMLInputElement).value = '';
                return;
            }

            currentOptions.push(newItem);
            _.set(newFields, `[${index}]['options']`, currentOptions);
            setQuestions(newFields);
            (event.target as HTMLInputElement).value = '';
        }
    };

    const handleDelete = (item: string, index: number) => {
        const newFields = [...questions];
        const currentOptions = _.get(
            newFields,
            `[${index}]['options']`,
            [] as string[],
        );

        const currentAnswers = _.get(
            newFields,
            `[${index}]['answers']`,
            [] as string[],
        );

        const newAnswers = currentAnswers.filter((x) => x !== item);
        const newOptions = currentOptions.filter((x) => x !== item);

        _.set(newFields, `[${index}]['answers']`, newAnswers);
        _.set(newFields, `[${index}]['options']`, newOptions);
        setQuestions(newFields);
    };

    return (
        <div className='flex-column'>
            <FormControl
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    border: '1px solid #b0b0b0',
                    borderRadius: '4px',
                    padding: '12px 8px',
                }}
            >
                {questionInfo.options.length > 0 && (
                    <div className='multiselect-label'>
                        Type Options (Minimun 2)
                    </div>
                )}
                <div className={'container'}>
                    {questionInfo.options.map((item) => (
                        <Chip
                            style={{
                                padding: '8px 4px',
                                margin: '5px',
                                fontSize: '16px',
                            }}
                            size='small'
                            onDelete={() => handleDelete(item, index)}
                            label={item}
                        />
                    ))}
                </div>
                <Input
                    sx={{
                        margin: '0 10px',
                        width: '300px',
                    }}
                    placeholder='Type Options (Minimun 2)'
                    onBlur={(e) => {
                        e.target.value = '';
                    }}
                    onKeyDown={(e) => handleAddOptions(e, index)}
                />
            </FormControl>
            <Typography
                style={{
                    fontSize: '12px',
                    color: '#b0b0b0',
                    marginBottom: '4px',
                }}
            >
                Type and press 'Enter' / 'Space' to create multiple Option
            </Typography>
            <Autocomplete
                multiple
                id='tags-outlined'
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
                                icon={icon}
                                checkedIcon={checkedIcon}
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
