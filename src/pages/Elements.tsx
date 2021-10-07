import { useContext, useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '..';
import ContentCard from '../components/ContentCard';
import { categories, statuses } from '../utils/Constants';

const Elements = () => {
    const { firestore } = useContext(Context);
    const [ elements ] = useCollectionData(firestore.collection('elements').orderBy('createdAt'), { idField: 'id' });

    const [ statusFilter, setStatusFilter] = useState('all');
    const [ categoryFilter, setCategoryFilter] = useState('all');

    const filteredbyStatus = useMemo(() => {
        if (statusFilter === 'all') return elements;
        //@ts-ignore
        return elements.filter(el => el.status === statusFilter);
    }, [elements, statusFilter]);

    const filteredbyStatusAndCategory = useMemo(() => {
        if (categoryFilter === 'all') return filteredbyStatus;
        //@ts-ignore
        return filteredbyStatus && filteredbyStatus.filter(el => el.category === categoryFilter);
    }, [filteredbyStatus, categoryFilter]);

    const onStatusFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value)
    }
    const onCategoryFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(e.target.value)
    }

    return (
        <>
            <h2 className="main-heading">Learned items panel</h2>
            <div id="filters" className="filters">
                <div className="filters__item input-box">
                    <select className="select" value={categoryFilter} onChange={onCategoryFilter}>
                        <option>all</option>
                        {categories.map(cat =>
                            <option key={cat}>{cat}</option>
                        )}
                        </select>
                    <label>Category</label>
                </div>
                <div className="filters__item input-box">
                    <select value={statusFilter} onChange={onStatusFilter} className="select">
                        <option>all</option>
                        {statuses.map(status =>
                            <option key={status}>{status}</option>
                        )}
                        </select>
                    <label>Status</label>
                </div>
            </div>
            <section className="elements-container elements-container_grid-four">
               {filteredbyStatusAndCategory && filteredbyStatusAndCategory.length ? filteredbyStatusAndCategory.map((el: any) =>
                <ContentCard key={el.id} element={el} />
                ) : <p style={{padding: 15}}>No elements found</p>}
            </section>
        </>
    );
};

export default Elements;