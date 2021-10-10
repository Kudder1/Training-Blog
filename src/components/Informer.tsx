import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '..';
import ElementCard from './ElementCard';

const Informer = () => {
    const [ elements ] = useCollectionData(firestore.collection('elements').orderBy('createdAt').limit(3), { idField: 'id' });
    return (
        <>
            {elements?.length ? <h3 style={{marginBottom: 15}}>Recent elements</h3> : null}
            <section className="elements-container elements-container_informer">
               {elements?.map((el: any) =>
                <ElementCard informer={true} key={el.id} element={el} />
                )}
            </section>
        </>
    );
};

export default Informer;