import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "..";
import ActivityCard from "../components/ActivityCard";
import Loader from "../components/Loader";
import { activity, trainingWeek, weekProps } from "../types/ContentTypes";
import { getWeekView } from "../utils/Functions";

const WeekPage = ({ week, setWeek, postPlanned, postCompleted }: weekProps) => {
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        fetchWeek();
    }, [])

    const weekName = useMemo(() => { if (week) return getWeekView(week.weekEdges.weekStart, week.weekEdges.weekEnd) }, [week])
    
    useEffect(() => {
        if (week) document.title = `Week: ${weekName}`
    }, [week, weekName])

    const fetchWeek = async () => {
        const querySnapshot = await firestore.collection('weeks').doc(id).get()
        const weekData = querySnapshot.data() as trainingWeek;
        setWeek({...weekData, id: querySnapshot.id});
    }

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