/**
 * @author Sagar Bhattacharya
 * @description Sidebar Component for Navigation
 */

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <aside className='hunar--sidebar'>
            <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/'
            >
                <AddCircleOutlineRoundedIcon /> Add Query
            </NavLink>
            <NavLink to='/jobs'>
                <BusinessCenterRoundedIcon /> Jobs
            </NavLink>
        </aside>
    );
};
