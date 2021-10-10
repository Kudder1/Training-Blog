import firebase from "firebase";
import { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "..";
import Loader from "../components/Loader";
import ProgressPie from "../components/ProgressPie";
import { trainingWeek, weekEdges } from "../types/ContentTypes";
import { getWeekView } from "../utils/Functions";
import { getWeekEdges } from "../utils/getWeekEdges";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as SaveIcon } from '../assets/save-icon.svg';

const initialProgress = {
    iceRink: {
        completed: 0,
        planned: 180,
    },
    offIce: {
        completed: 0,
        planned: 5,
    },
    stretching: {
        completed: 0,
        planned: 5,
    },
}

const initialPlanValues = {
    iceRink: false,
    offIce: false,
    stretching: false,
}

const Home = () => {
    const [user] = useAuthState(auth)
    const [plansEdit, setPlansEdit] = useState(initialPlanValues);

    const sendWeek = async (weekEdges: weekEdges) => {
        await firestore.collection('weeks').add({
            uid: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            weekEdges,
            ...initialProgress,
        })
    }

    const [week, setWeek] = useState(null as any)
    const fetchWeek = async () => {
        const querySnapshot = await firestore.collection('weeks').orderBy('createdAt', 'desc').limit(1).get();
        const weekDoc = querySnapshot.docs[0];
        if (!weekDoc) {
            // нет недели - отправь текущую чистую
           await sendWeek(getWeekEdges())
           await fetchWeek();
           return;
        }
        const weekData = weekDoc.data() as trainingWeek;
        querySnapshot.docs.forEach(el => {
            console.log(el.data(), 'weekDoc')

        })
        const today = new Date(Date.now());
        const weekStart = new Date(weekData.weekEdges.weekStart);
        const weekEnd = new Date(weekData.weekEdges.weekEnd);
        console.log(weekStart)
        console.log(weekEnd)
         if (weekStart > today || weekEnd < today) {
            console.log('week stale')
            await sendWeek(getWeekEdges());
            await fetchWeek();
            return;
        }
        setWeek({...weekData, id: querySnapshot.docs[0].id});
    }

    useEffect(() => {
        fetchWeek();
    }, [])

    const iceRinkPercent = useMemo(() => {
        if (week) {
            return Math.floor(week.iceRink.completed * 100 / week.iceRink.planned)
        }
        return 0;
    }, [week]);

    const iceRinkDegree = useMemo(() => {
        if (iceRinkPercent) {
            return 360 * iceRinkPercent / 100;
        }
        return 0;
    }, [iceRinkPercent]);

    const onPlanEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const planName = event.currentTarget.name;
        setPlansEdit({
            ...plansEdit,
            [planName]: true,
        })
    }

    if (!week) return <Loader/>

    return (
        <>
            <h1 className="main-heading">{getWeekView(week.weekEdges.weekStart, week.weekEdges.weekEnd)}</h1>
            <section className="activity-section activity-section--work">
                <div className="activity-section__item">
                    <h2 className="activity-section__title">Ice Rink</h2>
                    <div className="activity-progress">
                        <span title="In minutes" className="activity-progress__text">
                            <b>Progress:</b> {week.iceRink.completed} / {week.iceRink.planned}
                            {plansEdit.iceRink ?
                                <>
                                    <input value={week.iceRink.planned} className="progress-input"/>
                                    <button><SaveIcon/></button>
                                </>
                                : <button name="iceRink" onClick={onPlanEdit}><EditIcon fill="#000"/></button>
                            }
                        </span>
                    </div>
                    <input className="track-input" type="text" placeholder="Minutes" />
                    <button disabled className="track-btn">Track</button>
                </div>
                <div className="activity-section__item">
                    <ProgressPie percent={iceRinkPercent} degree={iceRinkDegree} />
                </div>
            </section>
            <section className="activity-section">
                <h2 className="activity-section__title">Off Ice</h2>
                <input className="track-input" type="text" placeholder="Times" />
                <button className="track-btn">Track</button>
            </section>
            <section className="activity-section">
                <h2 className="activity-section__title">Stretching</h2>
                <input className="track-input" type="text" placeholder="Times" />
                <button className="track-btn">Track</button>
            </section>
        </>
    );
};

export default Home;