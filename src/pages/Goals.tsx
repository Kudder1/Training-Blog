import { useEffect, useMemo, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "..";
import GoalCard from "../components/GoalCard";
import { goalFields } from "../types/ContentTypes";

const Goals = () => {
  const [ goals ]: any = useCollectionData(firestore.collection('goals').orderBy('createdAt', 'desc'), { idField: 'id' });
  const [ isDoneFilter, setIsDoneFilter] = useState('all');

  useEffect(() => { document.title = 'Goals' }, [])

  const filteredbyStatus = useMemo(() => {
    if (isDoneFilter === 'all') return goals;
    return goals.filter((el: goalFields) => el.isDone === !!isDoneFilter);
  }, [goals, isDoneFilter]);

  const onIsDoneFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => setIsDoneFilter(e.target.value);
    return (
    <>
        <h1 className="main-heading">Sport goals</h1>
        <div id="filters" className="filters">
            <div className="filters__item input-box">
              <select value={isDoneFilter} onChange={onIsDoneFilter} className="select">
                  <option>all</option>
                  <option value=''>not done</option>
                  <option value='done'>done</option>
                </select>
              <label>Status</label>
            </div>
        </div>
        <section className="goals-container">
          {filteredbyStatus?.length ? filteredbyStatus.map((el: goalFields) =>
            <GoalCard key={el.id} goal={el} />
          ) : <p style={{padding: 15}}>No elements found</p>}
        </section>
    </>
    );
};

export default Goals;