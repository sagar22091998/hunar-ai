/**
 * @author Sagar Bhattacharya
 * @description Job Queries Display Component
 */

import _ from 'lodash';
import { Typography } from '@mui/material';

import { QuestionType } from '../typings/app';

const renderQuestion = (question: QuestionType, index: number) => {
    switch (question.type) {
        case 'MCQQuestion':
            return (
                <div className='question-display' key={index}>
                    <div className='question-display--question'>
                        Q. MCQ Question
                    </div>
                    <p>
                        <div>Question - {question.question}</div>
                    </p>
                    <p>
                        <div>Options: {question.options.join(', ')}</div>
                    </p>
                    <p>
                        <div>Answers: {question.answers.join(', ')}</div>
                    </p>
                </div>
            );

        case 'TextQuestion':
            return (
                <div className='question-display' key={index}>
                    <div className='question-display--question'>
                        Q. Text Question
                    </div>
                    <p>
                        <div>Question - {question.question}</div>
                    </p>
                </div>
            );

        case 'YesNoQuestion':
            return (
                <div className='question-display' key={index}>
                    <div className='question-display--question'>
                        Q. Yes/No Question
                    </div>
                    <p>
                        <div>Question - {question.question}</div>
                    </p>
                    {question.subquestions.present && (
                        <div>
                            <p>
                                Subquestion - {question.subquestions.question}
                            </p>
                        </div>
                    )}
                </div>
            );

        case 'ImageQuestion':
            return (
                <div className='question-display' key={index}>
                    <div className='question-display--question'>
                        Q. Image Question
                    </div>
                    <p>
                        <div>Question - {question.question}</div>
                    </p>
                    <p>
                        <div>Description - {question.desc}</div>
                    </p>
                    <p>
                        <div>Image Name - {question.imageName}</div>
                    </p>
                </div>
            );

        default:
            return null;
    }
};

interface IProps {
    allJobQueries: QuestionType[][];
}

const DisplayAllJobs: React.FC<IProps> = ({ allJobQueries }) => {
    return (
        <div className='all-jobs-page'>
            <div className='all-jobs-page--header'>
                <Typography variant='h6'>Job Queries</Typography>
            </div>
            <div className='all-jobs-page--content'>
                {allJobQueries.length === 0 ? (
                    <Typography>No Jobs To Display</Typography>
                ) : (
                    <div>
                        {_.map(allJobQueries, (jobItem, jobIndex) => (
                            <div className='job-query' key={jobIndex}>
                                <h3>Job Query {jobIndex + 1}</h3>
                                {_.map(jobItem, (question, questionIndex) =>
                                    renderQuestion(question, questionIndex),
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayAllJobs;
