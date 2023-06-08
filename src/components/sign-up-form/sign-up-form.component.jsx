import { useState} from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";


const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();// ini digunakan agar halamar tidak melakukan refresh setelah submit
        const [displayName, email, password, confirmPassword] = event.target;
        if(password.value === confirmPassword.value){
            try{
                const { user } = await createAuthUserWithEmailAndPassword(email.value, password.value);
                await createUserDocumentFromAuth(user, {displayName: displayName.value});
                resetFormField();
            }catch(error){
                switch(error.code){
                    case "auth/email-already-in-use":
                        alert("Cannot create a new user, email already in use");
                        break;
                    case "auth/weak-password":
                        alert("Password should be at least 6 characters");
                        break;
                    default:
                        break;
                }
            }
        }else{
            alert("Password do not match");
            return;
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" id="displayName" type="text" onChange={handleChange} name="displayName" value={displayName} required/>

                <FormInput label="Email" id="email" type="email" onChange={handleChange} name="email" value={email} required/>

                <FormInput label="Password" id="password" type="password" onChange={handleChange} name="password" value={password} required/>

                <FormInput label="Confirm Password" id="confirmPassword" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>

                <Button buttonType='' type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;