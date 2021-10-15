import { useCollectionData } from "utils/useCollectionData";
import { firestore } from 'index';
import ElementCard from 'pages/Elements/ElementCard';
import { elementFields } from 'types/ContentTypes';
import { query, collection, orderBy, limit } from "firebase/firestore";

const Informer = () => {
    const [ elementsF ] = useCollectionData(query(collection(firestore, 'elements'), orderBy('createdAt', 'desc'), limit(3)))
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