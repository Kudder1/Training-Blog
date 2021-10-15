import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "index";
import ActivityCard from "components/ActivityCard";
import Loader from "components/Loader";
import { activity, trainingWeek, weekProps } from "types/ContentTypes";
import { getWeekView } from "utils/Functions";
import { doc, getDoc } from "firebase/firestore";

const WeekPage = ({ week, setWeek, postPlanned, postCompleted }: weekProps) => {
    const { id } = useParams<{id: string}>();

    const fetchWeek = useCallback(async () => {
        const querySnapshot = await getDoc(doc(firestore, 'weeks', id));
        const weekData = querySnapshot.data() as trainingWeek;
        setWeek({...weekData, id: querySnapshot.id});
    }, [id, setWeek])

    useEffect(() => {
        fetchWeek()
    }, [fetchWeek])

    const weekName = useMemo(() => { if (week) return getWeekView(week.weekEdges.weekStart, week.weekEdges.weekEnd) }, [week])
    
    useEffect(() => {
        if (week) document.title = `Week: ${weekName}`
    }, [week, weekName])

    if (!week) return <Loader/>

    return (
        <>
            <h1 className="main-heading">{weekName}</h1>
            {week.activities.map((activity: activity) => (
                <ActivityCard postCompleted={postCompleted} postPlanned={postPlanned} key={activity.name} activity={activity} />
            ))}
        </>
    );
};

export default WeekPage;