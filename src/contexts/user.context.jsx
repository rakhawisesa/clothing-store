import { createContext, useState, useEffect } from "react";
import { 
    onAuthStateChangedListener, 
    createUserDocumentFromAuth
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [ currentUser, setCurrentUser] = useState(null);

    /*
        Entitas didalam value adalah entitas yang akan
        diekspose oleh Provider
    */
    const value = {currentUser, setCurrentUser};

    /*
        Setiap kali kita melakukan submit form, maka akan dilakukan
        render ulang, maka urutan render ulang akan memanggil 'index.js'
        yang mana didalam 'index.js' terdapat '<UserProvider></UserProvider>',
        maka setiap render ulang 'UserProvider' ini akan dipanggil ulang,
        yang berarti setiap render ulang 'useEffect' didalam 'UserProvider'
        akan dipanggil, lalu akan mengeksekusi 'onAuthStateChangedListener'
        yang mana akan memantau perubahan dari state authentication
    */

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if(user){
                await createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}