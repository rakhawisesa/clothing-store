import './form-input.styles.scss';

const FormInput = ({label, ...inputProps}) => {
    return (
        <div className="group">
            <input className="form-input" {...inputProps}/>
            {   
                /*
                    If label props exists, then render the label tag
                */
                label && (
                    <label htmlFor="displayName" className={`${inputProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
                )
            }
        </div>
    )
}

export default FormInput;