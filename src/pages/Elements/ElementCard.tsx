import { useEffect, useRef, useState } from "react";
import { firestore } from "index";
import { elementFields } from "types/ContentTypes";
import { statuses } from "utils/Constants";
import { ReactComponent as EditIcon } from 'assets/edit-icon.svg';
import { ReactComponent as SaveIcon } from 'assets/save-icon.svg';
import { updateDoc, doc } from "firebase/firestore";

type ElementCardProps = {
    element: elementFields;
    informer?: boolean;
}

let isFormTouched = false;

const ElementCard = ({element, informer}: ElementCardProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [frontBlockWidth, setFrontBlockWidth] = useState(0);
    const frontBlock = useRef<HTMLDivElement>(null)
    const firstInput = useRef<HTMLInputElement>(null);
    const [values, setValues] = useState(element);

    useEffect(() => {
        const block = frontBlock.current;
        if (block) setFrontBlockWidth(block.offsetWidth);
    }, [frontBlock]);

    useEffect(() => {
        if (firstInput && isEdit) firstInput.current?.focus()
    }, [isEdit])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        isFormTouched = true;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const sendElement = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormTouched) {
            await updateDoc(doc(firestore, 'elements', element.id), {...values});
            isFormTouched = false;
        }
        setIsEdit(false);
    }

    return (
        <article className={`element element_${element.status} ${isEdit ? 'element_edit' : ''} ${informer ? 'element_informer' : ''}`}>
            {!informer ? 
                <form onSubmit={sendElement} aria-hidden={!isEdit} style={{width: frontBlockWidth}} className="element-container element-container_back">
                    <button tabIndex={isEdit ? 0 : -1} aria-label="Save Element" className="element__edit">
                        <SaveIcon/>
                    </button>
                    <div className="element__title-wrap">
                        <input aria-label="title" ref={firstInput} tabIndex={isEdit ? 0 : -1} name="title" onChange={handleInputChange} value={values.title} className="element__title element__title_edit"/>
                    </div>
                    <span className="element__category">{element.category}</span>
                    <textarea aria-label="description"  tabIndex={isEdit ? 0 : -1} rows={2} name="description" value={values.description} onChange={handleInputChange} className="element__text element__text_edit">{values.description}</textarea>
                    <select aria-label="status" tabIndex={isEdit ? 0 : -1} name="status" onChange={handleInputChange} className="element__status_edit" required value={values.status}>
                        {statuses.map(status => (
                            <option key={status}>{status}</option>
                        ))}
                    </select>
                </form>
            : null}
            <div ref={frontBlock} className="element-container element-container_front">
                {!informer ? <button tabIndex={!isEdit ? 0 : -1} onClick={() => setIsEdit(true)} aria-label="Edit Element" className="element__edit">
                    <EditIcon/>
                </button>
                 : null}
                <div className="element__title-wrap"><h3 className="element__title">{element.title}</h3></div>
                <p className="element__text">
                    <span className="element__category">{element.category}</span>
                    <span>{element.description}</span>
                </p>
                <p className="element__status">{element.status}</p>
            </div>
        </article>
    );
};

export default ElementCard;