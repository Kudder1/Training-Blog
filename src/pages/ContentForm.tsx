import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ELEMENTS_ROUTE, GOALS_ROUTE } from '../routes';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import { categories, contentTypes, statuses } from '../utils/Constants';

const initialValues = {
    type: 'element',
    category: 'spins',
    title: 'Spin jump',
    description: 'Eat more sweets every day',
    status: 'progress',
    deadline: '2021-12-13',
    isDone: false,
}

const ContentForm = () => {
    const history = useHistory();
    const { firestore, auth } = useContext(Context);
    const [values, setValues] = useState(initialValues);
    const [user] = useAuthState(auth)

    const sendCollection = async () => {
        await firestore.collection(`${values.type}s`).add({
            uid: user.uid,
            ...values,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const onContentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendCollection();
        values.type === 'element' ? history.push(ELEMENTS_ROUTE) : history.push(GOALS_ROUTE);
    }

    return (
        <form onSubmit={onContentSubmit} className="adding-form">
            <fieldset className="adding-form-item input-box">
                <select required name="type" className="select" onChange={handleInputChange} value={values.type}>
                    <option value="" disabled>Type</option>
                    {contentTypes.map(type =>
                        <option key={type}>{type}</option>
                    )}
                </select>
                <label>Type</label>
            </fieldset>
            <fieldset className="adding-form-item input-box">
                <select required name="category" className="select" onChange={handleInputChange} value={values.category}>
                    <option value="" disabled>Category</option>
                    {categories.map(category =>
                        <option key={category}>{category}</option>
                    )}
                </select>
                <label>Category</label>
            </fieldset>
            <fieldset className="adding-form-item input-box">
                <input required name="title" type="text" onChange={handleInputChange} value={values.title}/>
                <label>Title</label>
            </fieldset>
            <fieldset className="adding-form-item input-box">
                <textarea rows={4} required name="description" onChange={handleInputChange} value={values.description}></textarea>
                <label>Description</label>
            </fieldset>
            <fieldset className="adding-form-item input-box">
                <select required name="status" className="select" onChange={handleInputChange} value={values.status}>
                    <option value="" hidden disabled>Status</option>
                    {statuses.map(status =>
                        <option key={status}>{status}</option>
                    )}
                </select>
                <label>Status</label>
            </fieldset>
            {values.type === 'goal' ?
                <fieldset className="adding-form-item input-box">
                    <input required type="date" name="deadline" onChange={handleInputChange} value={values.deadline}/>
                </fieldset>
                : null
            }
            <button type="submit">Submit</button>
        </form>
    );
};

export default ContentForm;