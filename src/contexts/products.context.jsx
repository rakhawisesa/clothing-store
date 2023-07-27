import { createContext, useState, useEffect } from "react";
import {getCategoriesAndDocument} from "../utils/firebase/firebase.utils";

// Untuk memasukkan data json ke Firestore
// import SHOP_DATA from "../shop-data.js";
// import {addCollectionAndDocuments} from "../utils/firebase/firebase.utils.js"


/*
    'products' context digunakan untuk mengambil
    data dari JSON / Firestore
*/


export const ProductsContext = createContext({
    // Code lama
    // products: []

    // Code baru
    products: {},
});

export const ProductProvider = ({children}) => {
    // Code lama
    // const [products, setProducts] = useState(SHOP_DATA);

    // Code baru
    const [products, setProducts] = useState({});

    /*
        'useEffect' digunakan untuk menambahkan data
        kedalam Firestore Database yang berasal dari
        array didalam 'SHOP_DATA'.

        'useEffect' ini hanya digunakan sekali saja,
        sebelum data dari 'SHOP_DATA' berpindah ke
        Firestore database.
    */
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, []);

    /*
        'useEffect' dibawah ini digunakan untuk melakukan
        fetching data dari Firestore DB,
        yang mana hanya dilakukan sekali saja ketika
        products context pertama kali dieksekusi,
        bukan setiap di render ulang.
    */
    useEffect(() => {

        /*
            untuk dapat memanggil 'async function' didalam 'useEffect'
            dilakukan dengan cara seperti dibawah ini :
        */
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocument()
            setProducts(categoryMap);
        }

        getCategoriesMap();
    }, [])

    /*
        entitas didalam value adalah entitas yang akan diekspose oleh
        Provider
    */
    const value = {products};

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}