type SelectProps = {
    value: string | number
    title: string
    required?: boolean
    options: string[]
    parentClass?: string
    resetFilterOption?: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ onChange, value, title, required, options, parentClass = '', resetFilterOption }: SelectProps) => {
    return (
        <label className={`input-box ${parentClass}`}>
            <select required={required} name={title.toLowerCase()} className="input-box__element" onChange={onChange} value={value}>
                {resetFilterOption ? <option>{resetFilterOption}</option> : <option value="" disabled>{title}</option>}
                {options.map(type => <option key={type}>{type}</option>)}
            </select>
            <span>{title}</span>
        </label>
    );
};

export default Select;