import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '..';
import ContentCard from './ContentCard';

const Informer = () => {
    const [ elements ] = useCollectionData(firestore.collection('elements').orderBy('createdAt').limit(3), { idField: 'id' });
    return (
        <>
            <h3 style={{marginBottom: 15}}>Recent elements</h3>
            <section className="elements-container elements-container_informer">
               {elements && elements.map((el: any) =>
                <ContentCard informer={true} key={el.id} element={el} />
                )}
            </section>
        </>
    );
};

export default Informer;