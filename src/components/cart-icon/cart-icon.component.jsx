import { useContext } from "react";

// Code lama
// import "./cart-icon.styles.scss";

import {
    CartIconContainer,
    ShoppingSVG,
    ItemCount
} from "./cart-icon.styles";

// Code lama
// import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";


import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen,cartCount} = useContext(CartContext);

    const toggleOnClick = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleOnClick}>
            <ShoppingSVG/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;