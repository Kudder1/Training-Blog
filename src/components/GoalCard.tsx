import { goalFields } from '../types/ContentTypes';
import { getDate, isOverdue } from '../utils/Functions';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as SaveIcon } from '../assets/save-icon.svg';
import { ReactComponent as DoneIcon } from '../assets/done-icon.svg';
import { ReactComponent as NotDoneIcon } from '../assets/not-done-icon.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete-icon.svg';
import { ReactComponent as CalendarIcon } from '../assets/calendar-icon.svg';
import { ReactComponent as CalendarTimeIcon } from '../assets/calendar-time-icon.svg';
import { firestore } from '..';
import { useState } from 'react';

type GoalCardProps = {
    goal: goalFields;
}

let isFormTouched = false;

const GoalCard = ({ goal }: GoalCardProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [values, setValues] = useState(goal);

    const sendGoal = async () => {
        console.log(values)
        if (isFormTouched) {
            await firestore.collection(`${goal.type}s`).doc(goal.id).update(values);
            isFormTouched = false;
        }
        setIsEdit(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        isFormTouched = true;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const overdue = isOverdue(goal.deadline);

    const toggleDone = () => firestore.collection(`${goal.type}s`).doc(goal.id).update({isDone: !goal.isDone});
    const deleteGoal = () => firestore.collection(`${goal.type}s`).doc(goal.id).delete();

    return (
        <article className={`goal ${goal.isDone ? 'goal_done' : ''} ${isEdit ? 'goal_edit' : ''} ${overdue ? 'goal_overdue' : ''}`}>
            <div className="goal-container">
                <h2 className="goal__name">
                    { isEdit ? 
                        <input name="title" onChange={handleInputChange} value={values.title} /> : 
                        goal.title
                    }
                    {goal.isDone && !overdue ? <DoneIcon /> : null}
                </h2>
                <div className="date-info">
                    <div className="date-info__item">
                        <CalendarIcon className="date-info__icon date-info__icon_first"/>
                        <span>{getDate(goal.createdAt?.seconds)}</span>
                    </div>
                    <div className="date-info__item date-info__item_deadline">
                        <CalendarTimeIcon className="date-info__icon"/>
                        <span className="date-info__small-text">Due:</span><span>{getDate(goal.deadline)}</span>
                    </div>
                </div>
                { isEdit ? 
                    <textarea className="goal__description" name="description" onChange={handleInputChange} value={values.description} /> : 
                    <p className="goal__description">{goal.description}</p>
                }
                <div className="action-panel">
                    <button onClick={toggleDone} type="button" className="action-panel__item action-panel__item_done">
                        { goal.isDone ? <><NotDoneIcon/>Not Done</> : <><DoneIcon/>Done</> }
                    </button>
                    { isEdit ? 
                        <button onClick={sendGoal} className="action-panel__item"><SaveIcon/>Save</button> : 
                        <button onClick={() => setIsEdit(true)} className="action-panel__item"><EditIcon/>Edit</button>
                    }
                    <button onClick={deleteGoal} type="button" className="action-panel__item">
                        <DeleteIcon/>
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
};

export default GoalCard;