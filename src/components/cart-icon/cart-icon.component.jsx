import { useContext } from "react";
import "./cart-icon.styles.scss";
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen,cartCount} = useContext(CartContext);

    console.log(isCartOpen);
    const toggleOnClick = () => setIsCartOpen(!isCartOpen);

    return (
        <div className="cart-icon-container" onClick={toggleOnClick}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon;