import { useEffect, useMemo, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "index";
import { goalFields } from "types/ContentTypes";
import GoalCard from "./GoalCard";
import { goalStatuses } from "utils/Constants";
import Select from "components/FormElements/Select";

const Goals = () => {
  const [ goalsF ] = useCollectionData(firestore.collection('goals').orderBy('createdAt', 'desc'), { idField: 'id' });
  const goals = goalsF as goalFields[];
  const [ isDoneFilter, setIsDoneFilter] = useState('all');

  useEffect(() => { document.title = 'Goals' }, [])

  const filteredbyStatus = useMemo(() => {
    if (isDoneFilter === 'all') return goals;
    return goals.filter(el => el.isDone === !!isDoneFilter);
  }, [goals, isDoneFilter]);

  const onIsDoneFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === 'not done' ? setIsDoneFilter('') : setIsDoneFilter(e.target.value)
  };

    return (
    <>
        <h1 className="main-heading">Sport goals</h1>
        <div id="filters" className="filters">
          <Select options={goalStatuses} onChange={onIsDoneFilter} value={isDoneFilter} title="Status"
            parentClass="filters__item" resetFilterOption="all"
          />
        </div>
        <section className="goals-container">
          {filteredbyStatus?.length ? filteredbyStatus.map(el =>
            <GoalCard key={el.id} goal={el} />
          ) : <p style={{padding: 15}}>No elements found</p>}
        </section>
    </>
    );
};

export default Goals;