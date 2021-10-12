import { useEffect } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { NavLink } from 'react-router-dom';
import { firestore } from '..';
import { WEEKS_ROUTE } from '../routes';
import { trainingWeek } from '../types/ContentTypes';
import { getWeekView } from '../utils/Functions';

const Weeks = () => {
    const [ weeksF ]: any = useCollectionDataOnce(firestore.collection('weeks').orderBy('createdAt', 'desc'), { idField: 'id' });
    const weeks = weeksF as trainingWeek[];
    useEffect(() => {
        document.title = 'Weeks'
    }, [])
    return (
        <section>
            <h2 className="main-heading">Week archive</h2>
            {weeks?.map(week =>
                <NavLink className="week-link" to={`${WEEKS_ROUTE}/${week.id}`} key={week.id}>
                    {getWeekView(week.weekEdges.weekStart, week.weekEdges.weekEnd)}
                </NavLink>
            )}
        </section>
    );
};

export default Weeks;