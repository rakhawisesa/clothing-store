// Code lama
//import './form-input.styles.scss';

import {
    FormInputLabel,
    FormInputStyle,
    Group
} from './form-input.styles';

const FormInput = ({label, ...inputProps}) => {
    return (
        <Group>
            <FormInputStyle {...inputProps}/>
            {   
                /*
                    If label props exists, then render the label tag
                */
                label && (
                    <FormInputLabel shrink={inputProps.value.length}>{label}</FormInputLabel>
                )
            }
        </Group>
    )
}

export default FormInput;