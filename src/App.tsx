/**
 * @author Sagar Bhattacharya
 * @description Main App Component
 */

import { Navigate, Route, Routes } from 'react-router-dom';

import AddJobQuery from './components/AddJobQuery';
import { Sidebar } from './components/Sidebar';
import { useState } from 'react';
import { QuestionType } from './typings/app';
import DisplayAllJobs from './components/DisplayAllJobs';

const App: React.FC = () => {
    const [allJobQueries, setAllJobQueries] = useState<QuestionType[][]>([]);

    return (
        <div className='hunar'>
            <Sidebar />
            <main className='hunar--content'>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <AddJobQuery setAllJobQueries={setAllJobQueries} />
                        }
                    />
                    <Route
                        path='/jobs'
                        element={
                            <DisplayAllJobs allJobQueries={allJobQueries} />
                        }
                    />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
