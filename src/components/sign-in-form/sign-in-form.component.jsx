import { useState} from "react";
import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"
import './sign-in-form.styles.scss';
import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
 } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithGooglePopup();
        }catch(error){
            alert("Sign In with Google Cancelled")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const [email, password] = event.target;
        try{
            await signInAuthUserWithEmailAndPassword(email.value, password.value);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case "auth/wrong-password":
                    alert("Incorrect Password");
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-in-container">
            <h2>I Already have an account</h2>
            <span>Sign In with Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="email" id="email-sign-in" type="text" onChange={handleChange} name="email" value={email} required/>
                <FormInput label="password" id="password-sign-in" type="password" onChange={handleChange} name="password" value={password} required/>

                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Sign In with Google</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;