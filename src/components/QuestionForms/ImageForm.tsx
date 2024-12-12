/**
 * @author Sagar Bhattacharya
 * @description Form Data for Image Type Questions
 */

import React from 'react';
import _ from 'lodash';

import { QuestionType, ImageQuestion } from '../../typings/app';
import { TextField, Typography } from '@mui/material';
interface IProps {
    index: number;
    questionInfo: ImageQuestion;
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

// Currently Only using Image name as the Image Data
export const ImageForm: React.FC<IProps> = ({
    questions,
    questionInfo,
    index,
    setQuestions,
}) => {
    const handleAddFileData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuestions = [...questions];
        _.set(
            newQuestions,
            `[${index}]['imageName']`,
            e.target.files?.[0].name,
        );
        setQuestions(newQuestions);
    };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;

        const newQuestion = [...questions];
        _.set(newQuestion, `[${index}][${name}]`, value);
        setQuestions(newQuestion);
    };

    return (
        <div className='image-question-type flex-column'>
            <div className='image-question-type--button flex-center-between '>
                <Typography>Upload a Photo PNG, JPG, JPEG</Typography>
                <div className='image-upload-container'>
                    <label htmlFor='file-upload' className='custom-file-upload'>
                        {questionInfo.imageName ? (
                            <span>
                                {questionInfo.imageName.length > 10
                                    ? `${questionInfo.imageName.slice(0, 10)}...`
                                    : questionInfo.imageName}
                            </span>
                        ) : (
                            'Upload'
                        )}
                    </label>
                    <input
                        style={{ display: 'none' }}
                        onChange={handleAddFileData}
                        id='file-upload'
                        type='file'
                    />
                </div>
            </div>
            <TextField
                id='outlined-required'
                required
                name='desc'
                onChange={handleTextChange}
                label='Add your Image Description here'
                value={questionInfo.desc}
            />
            <Typography
                className='font-color-dark-gray'
                style={subInfoTextStyle}
            >
                This will be shown along with the photo before the question is
                asked ti the candidate
            </Typography>
            <TextField
                id='outlined-required'
                required
                name='question'
                onChange={handleTextChange}
                label='Add your question here'
                value={questionInfo.question}
            />
        </div>
    );
};

const subInfoTextStyle = { fontSize: '12px', marginTop: '8px' };
