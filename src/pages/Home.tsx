import firebase from "firebase";
import { useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "index";
import Loader from "components/Loader";
import { activity, trainingWeek, weekEdges, weekProps } from "types/ContentTypes";
import { getWeekView } from "utils/Functions";
import { getWeekEdges } from "utils/getWeekEdges";
import ActivityCard from "components/ActivityCard";
import { initialActivities } from "utils/Constants";

const Home = ({ week, setWeek, postPlanned, postCompleted }: weekProps) => {
    const [user] = useAuthState(auth)

    const sendWeek = useCallback(async (weekEdges: weekEdges) => {
        await firestore.collection('weeks').add({
            uid: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            weekEdges,
            activities: initialActivities,
        })
    }, [user.uid])

    const fetchWeek = useCallback(async () => {
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
    }, [setWeek, sendWeek])

    useEffect(() => {
        document.title = 'Home'
        fetchWeek();
    }, [fetchWeek])

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