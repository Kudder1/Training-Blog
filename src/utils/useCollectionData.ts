import { onSnapshot, Query } from "@firebase/firestore";
import { useEffect, useState } from "react";

export const useCollectionData = (query: Query) => {
    const [data, setData] = useState([]) as any[];

    useEffect(() => {
        const unsubscribe = onSnapshot(query, (querySnapshot) => {
            const newData: any[] = []; 
            querySnapshot.forEach(doc => newData.push({...doc.data(), id: doc.id}));
            setData(newData)
        });
        return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [ data ]
}