import { useContext } from "react";
import "./cart-icon.styles.scss";
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen,cartCount} = useContext(CartContext);

    const toggleOnClick = () => setIsCartOpen(!isCartOpen);

    return (
        <div className="cart-icon-container">
            <ShoppingIcon className="shopping-icon" onClick={toggleOnClick}/>
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon;