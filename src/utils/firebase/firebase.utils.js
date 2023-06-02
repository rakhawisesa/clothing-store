import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9wY15PwwJ_oHFHSP2gpy_BgVQBbG50nQ",
    authDomain: "crown-clothing-db-2f2a7.firebaseapp.com",
    projectId: "crown-clothing-db-2f2a7",
    storageBucket: "crown-clothing-db-2f2a7.appspot.com",
    messagingSenderId: "996279489937",
    appId: "1:996279489937:web:f51c5295aee5419db6b630"
  };
  
// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize auth provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

// Authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email,password);
}


// Database
export const db = getFirestore();
export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid); /*
        doc(dbRefference, collectionName, documentName).
        'doc()' digunakan untuk membuat object refference
    */
    const userSnapshot = await getDoc(userDocRef);/*
        'getDoc()' digunakan untuk mengambil data/retrieving data from database.
    */

    // If the user data does not exists
    if(!userSnapshot.exists()){
        // Create & set the document on the database
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });/*
                'setDoc' digunakan untuk menyimpan data.
                setDoc(objectRefference, {data}).

                '...additionalInformation' akan melakukan override
                'displayName' apabila 'displayName' memiliki value
                null.
            */
        }catch(error){
            console.error('Error creating the user', error.message);
        }
    }

    return userDocRef;
}