import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from 'index';
import ElementCard from 'pages/Elements/ElementCard';
import { elementFields } from 'types/ContentTypes';

const Informer = () => {
    const [ elementsF ] = useCollectionData(firestore.collection('elements').orderBy('createdAt', 'desc').limit(3), { idField: 'id' });
    const elements = elementsF as elementFields[]
    return (
        <>
            {elements?.length ? <h3 style={{marginBottom: 20}}>Recent elements</h3> : null}
            <section className="elements-container elements-container_informer">
                {elements?.map(el => <ElementCard informer={true} key={el.id} element={el}/> )}
            </section>
        </>
    );
};

export default Informer;