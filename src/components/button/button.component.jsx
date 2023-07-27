/*
    Jika menggunakan 'styled-components' maka tidak perlu menggunakan
    file import sass dibawah.
*/
// import './button.styles.scss';

/*
    Styling menggunakan 'styled-components' maka menggunakan
    file seperti dibawah
*/
import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";


/*
    We have 3 types of button :
    1. default button
    2. inverted button
    3. google sign in button
*/

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    if(buttonType === BUTTON_TYPE_CLASSES.base){
        return BaseButton;
    }else if(buttonType === BUTTON_TYPE_CLASSES.google){
        return GoogleSignInButton;
    }else{
        return InvertedButton;
    }
}

const Button = ({children, buttonType, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}

export default Button;