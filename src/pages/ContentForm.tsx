import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ELEMENTS_ROUTE, GOALS_ROUTE } from 'routes';
import { firestore } from 'index';
import { useAuthState } from 'utils/useAuthState';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { categories, contentTypes, statuses } from 'utils/Constants';
import { stateLocation } from 'types/ContentTypes';
import Input from 'components/FormElements/Input';
import Select from 'components/FormElements/Select';

const initialValues = {
    type: '',
    category: '',
    title: '',
    description: '',
    status: '',
    deadline: '',
    isDone: false,
}

type ContentFormProps = {
    location: stateLocation
}

const ContentForm = ({ location }: ContentFormProps) => {
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const {user} = useAuthState()

    useEffect(() => {
        document.title = 'Adding Form'
        const referrer = location.state.from;
        if (referrer === 'elements' || referrer === 'goals') {
            setValues(values => ({...values, type: referrer.substring(0, referrer.length - 1)}) );
        }
    }, [location.state.from])

    const getFields = () => {
        if (values.type === 'element') {
            const { deadline, isDone, ...properties } = values;
            return properties;
        } else if (values.type === 'goal') {
            const { category, status, ...properties } = values;
            return properties;
        }
    }

    const sendCollection = async () => {
        await addDoc(collection(firestore, `${values.type}s`), {
            uid: user!.uid,
            ...getFields(),
            createdAt: serverTimestamp()
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const onContentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendCollection();
        values.type === 'element' ? history.push(ELEMENTS_ROUTE) : history.push(GOALS_ROUTE);
    }

    return (
        <form onSubmit={onContentSubmit} className="adding-form">
            <Select options={contentTypes} required onChange={handleInputChange} value={values.type} title="Type"/>
            {values.type === 'element' ?
                <Select options={categories} required onChange={handleInputChange} value={values.category} title="Category"/> : null
            }
            <Input required onChange={handleInputChange} value={values.title} title="Title"/>
            <Input textarea rows={4} onChange={handleInputChange} value={values.description} title="Description"/>
            {values.type === 'element' ?
                <Select options={statuses} required onChange={handleInputChange} value={values.status} title="Status"/> : null
            }
            {values.type === 'goal' ?
                <Input type="date" required onChange={handleInputChange} value={values.deadline} title="Deadline"/> : null
            }
            <button aria-label={`Submit ${values.type}`} type="submit">Submit</button>
        </form>
    );
};

export default ContentForm;