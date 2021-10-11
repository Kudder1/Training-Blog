import firebase from "firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "..";
import Loader from "../components/Loader";
import { activity, trainingWeek, weekEdges } from "../types/ContentTypes";
import { getWeekView } from "../utils/Functions";
import { getWeekEdges } from "../utils/getWeekEdges";
import ActivityCard from "../components/ActivityCard";
import { initialActivities } from "../utils/Constants";

const Home = () => {
    const [user] = useAuthState(auth)
    const [week, setWeek] = useState(null as any | trainingWeek);

    useEffect(() => {
        fetchWeek();
    }, [])

    const sendWeek = async (weekEdges: weekEdges) => {
        await firestore.collection('weeks').add({
            uid: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            weekEdges,
            activities: initialActivities,
        })
    }

    const fetchWeek = async () => {
        const querySnapshot = await firestore.collection('weeks').orderBy('createdAt', 'desc').limit(1).get();
        const weekDoc = querySnapshot.docs[0];
        if (!weekDoc) {
           await sendWeek(getWeekEdges())
           await fetchWeek();
           return;
        }
        const weekData = weekDoc.data() as trainingWeek;
        const today = new Date(Date.now());
        const weekStart = new Date(weekData.weekEdges.weekStart);
        const weekEnd = new Date(weekData.weekEdges.weekEnd);
         if (weekStart > today || weekEnd < today) {
            await sendWeek(getWeekEdges());
            await fetchWeek();
            return;
        }
        setWeek({...weekData, id: querySnapshot.docs[0].id});
    }

    // think how reuse START
    const postCompleted = async (completed: number | string, name: string) => {
        const activity = week.activities.find((activity: activity) => activity.name === name)
        const updatedActivity = { ...activity, completed: activity.completed + completed }
        const updatedActivities = week.activities.map((activity: activity) => activity.name === updatedActivity.name ? updatedActivity : activity)
        setWeek({ ...week, activities: updatedActivities})
        await firestore.collection('weeks').doc(week.id).update({activities: updatedActivities})
    }
    const postPlanned = async (planned: number | string, name: string) => {
        const activity = week.activities.find((activity: activity) => activity.name === name)
        const updatedActivity = { ...activity, planned }
        const updatedActivities = week.activities.map((activity: activity) => activity.name === updatedActivity.name ? updatedActivity : activity)
        setWeek({ ...week, activities: updatedActivities})
        await firestore.collection('weeks').doc(week.id).update({activities: updatedActivities})
    }
    // think how reuse END

    if (!week) return <Loader/>

    return (
        <>
            <h1 className="main-heading">{getWeekView(week.weekEdges.weekStart, week.weekEdges.weekEnd)}</h1>
            {week.activities.map((activity: activity) => (
                <ActivityCard postCompleted={postCompleted} postPlanned={postPlanned} key={activity.name} activity={activity} />
            ))}
        </>
    );
};

export default Home;