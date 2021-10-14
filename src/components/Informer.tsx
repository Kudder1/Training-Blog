import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from 'index';
import ElementCard from 'pages/Elements/ElementCard';

const Informer = () => {
    const [ elements ] = useCollectionData(firestore.collection('elements').orderBy('createdAt', 'desc').limit(3), { idField: 'id' });
    return (
        <>
            {elements?.length ? <h3 style={{marginBottom: 20}}>Recent elements</h3> : null}
            <section className="elements-container elements-container_informer">
                {elements?.map((el: any) =>
                    <ElementCard informer={true} key={el.id} element={el} />
                )}
            </section>
        </>
    );
};

export default Informer;