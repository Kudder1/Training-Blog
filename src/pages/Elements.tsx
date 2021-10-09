import { useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '..';
import ElementCard from '../components/ElementCard';
import { contentFields } from '../types/ContentTypes';
import { categories, statuses } from '../utils/Constants';

const Elements = () => {
    const [ elements ]: any = useCollectionData(firestore.collection('elements').orderBy('createdAt'), { idField: 'id' });
    // подумать про кеширование useCollectionData
    const [ statusFilter, setStatusFilter] = useState('all');
    const [ categoryFilter, setCategoryFilter] = useState('all');

    const filteredbyStatus = useMemo(() => {
        if (statusFilter === 'all') return elements;
        return elements.filter((el: contentFields) => el.status === statusFilter);
    }, [elements, statusFilter]);

    const filteredbyStatusAndCategory = useMemo(() => {
        if (categoryFilter === 'all') return filteredbyStatus;
        return filteredbyStatus?.filter((el: contentFields) => el.category === categoryFilter);
    }, [filteredbyStatus, categoryFilter]);

    const onStatusFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)
    const onCategoryFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)

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
               {filteredbyStatusAndCategory?.length ? filteredbyStatusAndCategory.map((el: contentFields) =>
                <ElementCard key={el.id} element={el} />
                ) : <p style={{padding: 15}}>No elements found</p>}
            </section>
        </>
    );
};

export default Elements;