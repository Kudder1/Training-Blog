import { useCallback, useEffect } from "react";
import { useAuthState } from "utils/useAuthState";
import { firestore } from "index";
import Loader from "components/Loader";
import { activity, trainingWeek, weekEdges, weekProps } from "types/ContentTypes";
import { getWeekView } from "utils/Functions";
import { getWeekEdges } from "utils/getWeekEdges";
import ActivityCard from "components/ActivityCard";
import { initialActivities } from "utils/Constants";
import { query, orderBy, limit, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const Home = ({ week, setWeek, postPlanned, postCompleted }: weekProps) => {
    const {user} = useAuthState()

    const sendWeek = useCallback(async (weekEdges: weekEdges) => {
        if (user) {
            await addDoc(collection(firestore, 'weeks'), {
                uid: user.uid,
                createdAt: serverTimestamp(),
                weekEdges,
                activities: initialActivities,
            })
        }
    }, [user])

    const fetchWeek = useCallback(async () => {
        const q = query(collection(firestore, 'weeks'), orderBy('createdAt', 'desc'), limit(1));
        let querySnapshot;
        try {
            querySnapshot = await getDocs(q)
        } catch (e) {
            alert('Error getting the week')
            return;
        }
        const weekDoc = querySnapshot.docs[0];
        if (!weekDoc) {
            await sendWeek(getWeekEdges())
            await fetchWeek();
            return;
        }
        const weekData = weekDoc.data() as trainingWeek;
        const today = new Date(Date.now()).getDate();
        const weekStart = new Date(weekData.weekEdges.weekStart).getDate();
        const weekEnd = new Date(weekData.weekEdges.weekEnd).getDate();
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
            <section className="activity-block">
                {week.activities.map((activity: activity) => (
                    <ActivityCard postCompleted={postCompleted} postPlanned={postPlanned} key={activity.name} activity={activity} />
                ))}
            </section>
        </>
    );
};

export default Home;