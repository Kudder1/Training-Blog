type InputProps = {
    value: string | number
    title: string
    required?: boolean
    type?: string
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
    className?: string
    maxLength?: number
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    textarea?: boolean,
    rows?: number
}

const Input = ({ onChange, value, title, required, type = 'text', inputMode = "text", maxLength, className = '', textarea, rows }: InputProps) => {
    return (
        <label className="input-box">
            {textarea ?
                <textarea 
                    rows={rows}
                    required={required}
                    name={title.toLowerCase()}
                    onChange={onChange}
                    value={value}
                    className={`input-box__element ${className}`}
                />
                :
                <input
                    className={`input-box__element ${className}`}
                    maxLength={maxLength} 
                    required={required}
                    name={title.toLowerCase()}
                    type={type}
                    onChange={onChange}
                    value={value}
                    inputMode={inputMode}
                />
            }
            <span>{title}</span>
        </label>
    );
};

export default Input;