import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "..";
import GoalCard from "../components/GoalCard";
import { goalFields } from "../types/ContentTypes";

const Goals = () => {
  const [ goals ]: any = useCollectionData(firestore.collection('goals').orderBy('createdAt'), { idField: 'id' });

    return (
    <>
        <h1 className="main-heading">Sport goals</h1>
        {/* <select>
          <option>Jumps</option>
          <option>Steps</option>
          <option>Spins</option>
        </select>
        <select>
          <option>Done</option>
          <option>Not done</option>
        </select> */}
        <section className="goals-container">
          {goals?.length ? goals.map((el: goalFields) =>
            <GoalCard key={el.id} goal={el} />
          ) : <p style={{padding: 15}}>No elements found</p>}
        </section>
    </>
    );
};

export default Goals;