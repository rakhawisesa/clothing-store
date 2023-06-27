import {createContext, useState, useEffect} from 'react';

/*
    'cartItems' merupakan variable penampung items yang berada pada dropdown

    'productToAdd' merupakan variable yang berisi item baru yang akan ditambahkan
        kedalam 'cartItems'
*/
const addCartItem = (cartItems, productToAdd) => {
    // Find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }

    // return new array with modified cartItems if new item did not found
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    // Find if cartItems contains productToRemove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    
    // check if quantity equal to 1, if it is, remove the item from cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    // return 'cartItems' with reduced quantity
    /*
        Mengapa selalu mereturn array baru?
        Karena berkaitan dengan re-rendering, ketika React mendeteksi ada props baru 
        -- dengan cara mengecek alamat memory dari props, jika alamat memory berbeda
        maka dikatakan props baru --, maka React akan melakukan re-rendering.
    */
    return cartItems.map((cartItem) => (cartItem.id === productToRemove.id) ?
        {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    )
}

const removeAllFromCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}


/*
    Fungsi masing-masing actual context :
    Untuk toggle dropdown : 'isCartOpen' & 'setIsCartOpen'
    Untuk item pada dropdown : 'cartItems', 'setCartItems', & 'addItemToCart'
    Untuk menampakkan jumlah item pada CartIcon : 'totalItems' & 'setTotalItem'
*/
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemInCart: () => null,
    removeAllQuantityFromCart: () => null,
    cartCount: 0,
    totalPayment: 0,
    setTotalPayment: () => null,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemInCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const removeAllQuantityFromCart = (productToRemove) => {
        setCartItems(removeAllFromCartItem(cartItems, productToRemove));
    };

    /*
        setiap 'cartItems' memiliki perubahan value, maka akan dilakukan
        kalkulasi 'setCartCount' yang berada didalam 'useEffect'
    */
    useEffect(() => {
        setCartCount(
            cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        );
    }, [cartItems]);

    /*
        Pastikan setiap 1 'useEffect' hanya menangani 1 buah utility,
        jadi 'useEffect' pertama menangani 'setCartCount' dan 'useEffect'
        kedua menangani 'setTotalPayment'
    */
    useEffect(() => {
        setTotalPayment(
            cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        )
    }, [cartItems]);

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        removeItemInCart, 
        removeAllQuantityFromCart,
        totalPayment,
        cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}