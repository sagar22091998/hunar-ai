import React from 'react';
import { QuestionType, ImageQuestion } from '../../typings/app';
import { TextField, Typography } from '@mui/material';
import _ from 'lodash';
// import CloseIcon from '@mui/icons-material/Close';
interface IProps {
    index: number;
    questionInfo: ImageQuestion;
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

export const ImageForm: React.FC<IProps> = ({
    questions,
    questionInfo,
    index,
    setQuestions,
}) => {
    const handleAddFileData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuestions = [...questions];
        _.set(newQuestions, `[${index}]['fileData']`, e.target.files);
        setQuestions(newQuestions);
    };

    // const clearFileData = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newQuestions = [...questions];
    //     _.omit(newQuestions, `[${index}]['fileData']`);
    //     setQuestions(newQuestions);
    //     console.log(newQuestions, questions);
    // };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;

        const newFields = [...questions];
        _.set(newFields, `[${index}][${name}]`, value);
        setQuestions(newFields);
    };

    return (
        <div className='flex-column'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Upload a Photo PNG, JPG, JPEG</Typography>
                <div className='image-upload-container'>
                    <label htmlFor='file-upload' className='custom-file-upload'>
                        {questionInfo.fileData ? (
                            <span>
                                {questionInfo.fileData[0].name.length > 20
                                    ? `${questionInfo.fileData[0].name.slice(0, 20)}...`
                                    : questionInfo.fileData[0].name}
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
                style={{
                    fontSize: '12px',
                    color: '#b0b0b0',
                    marginBottom: '4px',
                }}
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
