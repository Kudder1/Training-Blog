import { useEffect, useRef, useState } from "react";
import { firestore } from "..";
import { contentFields } from "../types/ContentTypes";
import { statuses } from "../utils/Constants";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as SaveIcon } from '../assets/save-icon.svg';

type ElementCardProps = {
    element: contentFields;
    informer?: boolean;
}

let isFormTouched = false;

const ElementCard = ({element, informer}: ElementCardProps) => {
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
                        <SaveIcon/>
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
                    <EditIcon/>
                </button>
                 : null}
                <div className="element__title-wrap"><h3 className="element__title">{element.title}</h3></div>
                <p className="element__text">{element.description}</p>
                <p className="element__status">{element.status}</p>
            </div>
        </article>
    );
};

export default ElementCard;