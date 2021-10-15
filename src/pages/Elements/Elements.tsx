import { useEffect, useMemo, useState } from 'react';
import { useCollectionData } from 'utils/useCollectionData';
import { firestore } from 'index';
import { elementFields } from 'types/ContentTypes';
import { categories, statuses } from 'utils/Constants';
import ElementCard from './ElementCard';
import Select from 'components/FormElements/Select';
import { query, collection, orderBy } from '@firebase/firestore';

const Elements = () => {
    const [ elementsF ] = useCollectionData(query(collection(firestore, 'elements'), orderBy('createdAt', 'desc')));
    const elements = elementsF as elementFields[];
    const [ statusFilter, setStatusFilter] = useState('all');
    const [ categoryFilter, setCategoryFilter] = useState('all');

    useEffect(() => { document.title = 'Elements' }, [])

    const filteredbyStatus = useMemo(() => {
        if (statusFilter === 'all') return elements;
        return elements.filter(el=> el.status === statusFilter);
    }, [elements, statusFilter]);

    const filteredbyStatusAndCategory = useMemo(() => {
        if (categoryFilter === 'all') return filteredbyStatus;
        return filteredbyStatus?.filter(el => el.category === categoryFilter);
    }, [filteredbyStatus, categoryFilter]);

    const onStatusFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)
    const onCategoryFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)

    return (
        <>
            <h2 className="main-heading">Learned items panel</h2>
            <div id="filters" className="filters">
                <Select options={categories} onChange={onCategoryFilter} value={categoryFilter} title="Category"
                    parentClass="filters__item" resetFilterOption="all"
                />
                <Select options={statuses} onChange={onStatusFilter} value={statusFilter} title="Status"
                    parentClass="filters__item" resetFilterOption="all"
                />
            </div>
            <section className="elements-container elements-container_grid-four">
               {filteredbyStatusAndCategory?.length ? filteredbyStatusAndCategory.map(el =>
                <ElementCard key={el.id} element={el} />
                ) : <p style={{padding: 15}}>No elements found</p>}
            </section>
        </>
    );
};

export default Elements;