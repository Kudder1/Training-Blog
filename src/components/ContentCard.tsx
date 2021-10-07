import { useEffect, useRef, useState } from "react";
import { firestore } from "..";
import { statuses } from "../utils/Constants";

let isFormTouched = false;

const ContentCard = ({element, informer}: any) => {
    const [isEdit, setIsEdit] = useState(false);
    const [frontBlockWidth, setFrontBlockWidth] = useState(0);
    const frontBlock = useRef<HTMLDivElement>(null)
    const [values, setValues] = useState(element);

    useEffect(() => {
        const block = frontBlock.current;
        if (block) setFrontBlockWidth(block.offsetWidth);
    }, [frontBlock]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        isFormTouched = true;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const sendElement = async () => {
        if (isFormTouched) {
            await firestore.collection(`${element.type}s`).doc(element.id).update(values);
            isFormTouched = false;
        }
        setIsEdit(false);
    }

    return (
        <article className={`element element_${element.status} ${isEdit ? 'element_edit' : ''} ${informer ? 'element_informer' : ''}`}>
            {!informer ? 
                <div style={{width: frontBlockWidth}} className="element-container element-container_back">
                    <button onClick={sendElement} className="element__edit">
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M272 64h-16c-4.4 0-8 3.6-8 8v72c0 4.4 7.6 8 12 8h12c4.4 0 8-3.6 8-8V72c0-4.4-3.6-8-8-8z"/><path d="M433.9 130.1L382 78.2c-9-9-21.3-14.2-34.1-14.2h-28c-8.8 0-16 7.3-16 16.2v80c0 8.8-7.2 16-16 16H160c-8.8 0-16-7.2-16-16v-80c0-8.8-7.2-16.2-16-16.2H96c-17.6 0-32 14.4-32 32v320c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V164c0-12.7-5.1-24.9-14.1-33.9zM322 400.1c0 8.8-8 16-17.8 16H143.8c-9.8 0-17.8-7.2-17.8-16v-96c0-8.8 8-16 17.8-16h160.4c9.8 0 17.8 7.2 17.8 16v96z"/></svg>
                    </button>
                    <div className="element__title-wrap">
                        <input name="title" onChange={handleInputChange} value={values.title} className="element__title element__title_edit"/>
                    </div>
                    <textarea rows={values.description.length / 29} name="description" value={values.description} onChange={handleInputChange} className="element__text element__text_edit">{values.description}</textarea>
                    <select name="status" onChange={handleInputChange} className="element__status_edit" required value={values.status}>
                        {statuses.map(status => (
                            <option key={status}>{status}</option>
                        ))}
                    </select>
                </div>
            : null}
            <div ref={frontBlock} className="element-container element-container_front">
                {!informer ? <button onClick={() => setIsEdit(true)} className="element__edit">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#C2CFE0"/>
                    </svg>
                </button>
                 : null}
                <div className="element__title-wrap"><h3 className="element__title">{element.title}</h3></div>
                <p className="element__text">{element.description}</p>
                <p className="element__status">{element.status}</p>
            </div>
        </article>
    );
};

export default ContentCard;