import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore'

/* Your web app's Firebase configuration */
const firebaseConfig = {
    apiKey: "AIzaSyA9wY15PwwJ_oHFHSP2gpy_BgVQBbG50nQ",
    authDomain: "crown-clothing-db-2f2a7.firebaseapp.com",
    projectId: "crown-clothing-db-2f2a7",
    storageBucket: "crown-clothing-db-2f2a7.appspot.com",
    messagingSenderId: "996279489937",
    appId: "1:996279489937:web:f51c5295aee5419db6b630"
};
  
/* Initialize Firebase */
initializeApp(firebaseConfig);

/* Initialize DB */
export const db = getFirestore();

/* Initialize auth provider */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

/* Authentication */
export const auth = getAuth();
// Authentication - Sign In
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}
// Authentication - Sign Up
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
}

/* Sign Out */
export const signOutUser = async () => await signOut(auth);

/* Observer Pattern */
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

/*
    Migrates the data from 'shop-data.js' to Firestore
*/
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);/*
        Digunakan untuk melakukan generate 'collection' baru, setelah itu
        akan menyediakan refference yang mengacu pada 'collection' baru yang
        telah dibuat tadi.
    */

    const batch = writeBatch(db);

    /*
        'objectsToAdd' bertipe data array
    */
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

/*
    Retrieves data from Firestore at 'categories' collection
*/
export const getCategoriesAndDocument = async () => {
    const collectionRef = collection(db, 'categories');/*
        Untuk menentukan target DB
    */

    const queryDB = query(collectionRef);/*
        Untuk locking target DB mana yang akan dilakukan
        query
    */

    const querySnapshot = await getDocs(queryDB);/*
        'querySnapshot' berisi collection dengan key 'categories'
    */
   
    const categoryMap = querySnapshot.docs.reduce((iterator, docSnapshot) => {
        const {title, items} = docSnapshot.data();/*
            Destructure Object, gambaran kerangka Object dapat
            dilihat pada 'shop-data.js'
        */

        iterator[title.toLowerCase()] = items;/*
            Code ini akan membuat kerangka object menjadi : 
            {
                hats: [
                        {},
                        {}
                    ],
                sneakers: [
                        {},
                        {}
                    ]
            }
        */

       return iterator;
    }, {});

    return categoryMap;
}

/* Database - create user data */
export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid); /*
        doc(dbRefference, collectionName, documentName).
        'doc()' digunakan untuk membuat object refference.
    */
   
    const userSnapshot = await getDoc(userDocRef);/*
        'getDoc()' digunakan untuk mengambil data/retrieving data from database.
    */

    // If the user data does not exists
    if(!userSnapshot.exists()){
        // Create & set the document on the database
        const {displayName, email} = userAuth; /*
            'displayName' & 'email' didapatkan dari
            hasil return authentication proses
        */
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
            alert("Error creating user data");
        }
    }

    return userDocRef;
}