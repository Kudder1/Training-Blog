import React, { useEffect, useMemo, useRef, useState } from 'react';
import { activity } from "types/ContentTypes";
import { ReactComponent as EditIcon } from 'assets/edit-icon.svg';
import { ReactComponent as SaveIcon } from 'assets/save-icon.svg';
import ProgressPie from "components/ProgressPie";

type ActivityCardProps = {
    activity: activity;
    postCompleted: (completed: number, name: string) => void;
    postPlanned: (planned: number, name: string) => void;
}

const ActivityCard = ({ activity, postCompleted, postPlanned }: ActivityCardProps) => {
    const { planned, completed, name } = activity;

    const [completedValue, setCompletedValue] = useState('' as number | string);
    const [plannedValue, setPlannedValue] = useState(planned as number);
    const [plannedEdit, setPlannedEdit] = useState(false);
    const plannedRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
     if (plannedEdit) plannedRef.current?.focus()
    }, [plannedEdit])

    const iceRinkPercent = useMemo(() => {
        return Math.floor(activity.completed * 100 / activity.planned)
    }, [activity.completed, activity.planned]);

    const iceRinkDegree = useMemo(() => {
        return 360 * iceRinkPercent / 100;
    }, [iceRinkPercent]);

    const onPlanSave = async () => {
        setPlannedEdit(false)
        postPlanned(plannedValue, name);
    }

    const onCompletedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postCompleted(+completedValue, name);
        setCompletedValue('');
    }

    return (
        <section className="activity-section">
        <div className="activity-section__item">
            <h2 className="activity-section__title">{name}</h2>
            <div className="activity-progress">
                <div className="activity-progress__text">
                    <span><b>Progress:</b> {completed} / </span>
                    {plannedEdit ?
                        <>
                            <input ref={plannedRef} maxLength={3} value={plannedValue} onChange={e => setPlannedValue(+e.target.value)} inputMode="decimal" className="completed-input"/>
                            <button aria-label="Save Planned" onClick={onPlanSave} className="completed-btn completed-btn_save"><SaveIcon/></button>
                        </>
                        :
                        <>
                            <span className="completed-plan">{planned}</span>
                            <button aria-label="Edit Planned" className="completed-btn completed-btn_edit" onClick={() => setPlannedEdit(true)}><EditIcon fill="#000"/></button>
                        </>
                    }
                </div>
            </div>
            <form onSubmit={onCompletedSubmit} className="activity-tracking d-flex">
                <fieldset className="input-box">
                    <input value={completedValue} onChange={e => setCompletedValue(+e.target.value)} required maxLength={3} className="track-input" inputMode="decimal" type="text"/>
                    <label>{name === 'Ice Rink' ? 'Minutes' : 'Times'}</label>
                </fieldset>
                <button aria-label="Track Progress" disabled={!completedValue} className="track-btn">Track</button>
            </form>
        </div>
        <div className="activity-section__item">
            <ProgressPie percent={iceRinkPercent} degree={iceRinkDegree} />
        </div>
    </section>
    );
};

export default ActivityCard;