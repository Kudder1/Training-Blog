import firebase from "firebase";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "..";
import Loader from "../components/Loader";
import ProgressPie from "../components/ProgressPie";
import { activityFields, trainingWeek, weekEdges } from "../types/ContentTypes";
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

const trackProgressValues: any = {
    iceRink: '',
    offIce: '',
    stretching: '',
}

const Home = () => {
    const [user] = useAuthState(auth)
    const [plansEdit, setPlansEdit] = useState(initialPlanValues);
    const [week, setWeek] = useState(null as any | trainingWeek);
    const [progress, setProgress] = useState(trackProgressValues);

    useEffect(() => {
        fetchWeek();
    }, [])

    const sendWeek = async (weekEdges: weekEdges) => {
        await firestore.collection('weeks').add({
            uid: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            weekEdges,
            ...initialProgress,
        })
    }

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
        const today = new Date(Date.now());
        const weekStart = new Date(weekData.weekEdges.weekStart);
        const weekEnd = new Date(weekData.weekEdges.weekEnd);
         if (weekStart > today || weekEnd < today) {
            console.log('week stale')
            await sendWeek(getWeekEdges());
            await fetchWeek();
            return;
        }
        setWeek({...weekData, id: querySnapshot.docs[0].id});
    }

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

    const onPlanEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name;
        setPlansEdit({...plansEdit, [name]: true})
    }

    const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const plan = week[name] as activityFields;
        setWeek({
            ...week,
            [name]: { ...plan, planned: +value }
        })
    };

    const onPlanSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const planName = e.currentTarget.name;
        const plan = week[planName];
        await firestore.collection('weeks').doc(week.id).update({[planName]: plan});
        setPlansEdit({...plansEdit, [planName]: false})
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProgress({
            ...progress,
            [name]: +value
        })
    };

    const onTrackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name: progressName } = e.target as HTMLFormElement;
        const progressBE = week[progressName];
        const progressFE = progress[progressName];
        const updatedProgress = {
            ...progressBE,
            completed: progressBE.completed + progressFE
        };
        setProgress({
            ...progress,
            [progressName]: '',
        })
        setWeek({
            ...week,
            [progressName]: updatedProgress
        })
        await firestore.collection('weeks').doc(week.id).update({[progressName]: updatedProgress});
    }

    if (!week) return <Loader/>

    return (
        <>
            <h1 className="main-heading">{getWeekView(week.weekEdges.weekStart, week.weekEdges.weekEnd)}</h1>
            <section className="activity-section">
                <div className="activity-section__item">
                    <h2 className="activity-section__title">Ice Rink</h2>
                    <div className="activity-progress">
                        <div title="In minutes" className="activity-progress__text">
                            <b>Progress:</b> {week.iceRink.completed} / 
                            {plansEdit.iceRink ?
                                <>
                                    <input maxLength={3} name="iceRink" value={week.iceRink.planned} onChange={handlePlanChange} className="progress-input"/>
                                    <button onClick={onPlanSave} className="progress-btn progress-btn_save" name="iceRink"><SaveIcon/></button>
                                </>
                                :
                                <>
                                    <span className="progress-plan">{week.iceRink.planned}</span>
                                    <button className="progress-btn progress-btn_edit" name="iceRink" onClick={onPlanEdit}><EditIcon fill="#000"/></button>
                                </>
                            }
                        </div>
                    </div>
                    <form name="iceRink" onSubmit={onTrackSubmit} className="activity-tracking d-flex">
                        <fieldset className="input-box">
                            <input value={progress.iceRink} onChange={handleProgressChange} required name="iceRink" maxLength={3} className="track-input" inputMode="decimal"/>
                            <label>Minutes</label>
                        </fieldset>
                        <button disabled={!progress.iceRink} className="track-btn">Track</button>
                    </form>
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