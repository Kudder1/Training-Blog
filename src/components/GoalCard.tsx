import { goalFields } from '../types/ContentTypes';
import { getDate } from '../utils/Functions';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as DoneIcon } from '../assets/done-icon.svg';
import { ReactComponent as NotDoneIcon } from '../assets/not-done-icon.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete-icon.svg';
import { ReactComponent as CalendarIcon } from '../assets/calendar-icon.svg';
import { ReactComponent as CalendarTimeIcon } from '../assets/calendar-time-icon.svg';
import { firestore } from '..';

type GoalCardProps = {
    goal: goalFields;
}

const GoalCard = ({ goal }: GoalCardProps) => {
    const toggleDone = () => firestore.collection(`${goal.type}s`).doc(goal.id).update({isDone: !goal.isDone});
    const deleteGoal = () => firestore.collection(`${goal.type}s`).doc(goal.id).delete();
    return (
       
        <article className={`goal ${goal.isDone ? 'goal_done' : ''}`}>
            <div className="goal-container">
            <h2 className="goal__name">
                {goal.title}
                {goal.isDone ? <DoneIcon /> : null}
            </h2>
            <div className="date-info">
                <div className="date-info__item">
                    <CalendarIcon className="date-info__icon date-info__icon_first"/>
                    <span>{getDate(goal.createdAt.seconds)}</span>
                </div>
                <div className="date-info__item">
                    <CalendarTimeIcon className="date-info__icon"/>
                    <span className="date-info__small-text">Due:</span><span>{getDate(goal.deadline)}</span>
                </div>
            </div>
            <p className="goal__description">{goal.description}</p>
            <div className="action-panel">
                <button onClick={toggleDone} type="button" className="action-panel__item action-panel__item_done">
                    { goal.isDone ? <><NotDoneIcon/>Not Done</> : <><DoneIcon/>Done</> }
                </button>
                <button className="action-panel__item">
                    <EditIcon/>
                    Edit
                </button>
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