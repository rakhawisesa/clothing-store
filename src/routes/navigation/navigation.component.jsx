import {Fragment, useContext} from 'react';

/*
    Jika menggunakan 'styled-components' maka 'Link' akan diimport
    dari file 'styled-components' bukan lagi dari file component
*/
// import { Outlet, Link} from 'react-router-dom';

/*
    Jika menggunakan 'styled-components' maka tidak perlu menggunakan
    file import sass dibawah.
*/
// import './navigation.styles.scss

import {Outlet} from 'react-router-dom';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

/*
    Styling menggunakan 'styled-components' maka menggunakan
    file seperti dibawah
*/
import {
    LogoContainer, 
    NavigationContainer,
    NavLinkContainer,
    NavLink,
} from './navigation.styles';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer className='logo-container' to='/'>
                    <CrwnLogo  className="logo"/>
                </LogoContainer>
                <NavLinkContainer>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon/>
                </NavLinkContainer>
                {
                    isCartOpen && <CartDropdown/>
                }
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;