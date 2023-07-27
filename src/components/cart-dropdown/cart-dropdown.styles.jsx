import styled from 'styled-components';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton
} from "../button/button.styles"

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  /*
    Nesting selector, selector dibawah ini akan menarget element
    'BaseButton', 'GoogleSignInButton', 'InvertedButton' yang
    berada didalam 'CartDropdownContainer'.

    Kenapa harus melakukan import 'BaseButton', 'GoogleSignInButton',
    dan 'InvertedButton'? Karena styling dengan 'styled-components'
    menempel pada tiap component, artinya styling 'cart-dropdown'
    hanya akan menempel pada 'cart-dropdown' component, sehingga
    untuk bisa melakukan styling salah satu jenis button yang berada 
    didalam 'cart-dropdown' component diperlukan import style dari 
    button yang berada didalam '../button/button.styles'
  */
  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`

// .cart-dropdown-container {
//     position: absolute;
//     width: 240px;
//     height: 340px;
//     display: flex;
//     flex-direction: column;
//     padding: 20px;
//     border: 1px solid black;
//     background-color: white;
//     top: 90px;
//     right: 40px;
//     z-index: 5;
  
//     .empty-message {
//       font-size: 18px;
//       margin: 50px auto;
//     }
  
//     .cart-items {
//       height: 240px;
//       display: flex;
//       flex-direction: column;
//       overflow: scroll;
//     }
  
//     button {
//       margin-top: auto;
//     }
// }
  