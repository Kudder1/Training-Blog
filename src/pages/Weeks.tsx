import { useEffect } from 'react';
import { useCollectionData } from 'utils/useCollectionData';
import { NavLink } from 'react-router-dom';
import { firestore } from 'index';
import { WEEKS_ROUTE } from 'routes';
import { trainingWeek } from 'types/ContentTypes';
import { getWeekView } from 'utils/Functions';
import { query, collection, orderBy } from '@firebase/firestore';

const Weeks = () => {
    const [ weeksF ] = useCollectionData(query(collection(firestore, 'weeks'), orderBy('createdAt', 'desc')));
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