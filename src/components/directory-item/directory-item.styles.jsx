import styled from 'styled-components';

/*
  Pada 'DirectoryItemContainer' dapat dilihat menargetkan 
  element 'BackgroundImage' serta 'DirectoryItemBodyContainer',
  maka dari itu pendeklarasian 'BackgroundImage' serta
  'DirectoryItemBodyContainer' dilakukan terlebih dahulu
  sebelum deklarasi 'DirectoryItemContainer'
*/

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.imageUrl})`}
`
export const DirectoryItemBodyContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;

  /*
    Dibawah ini adalah contoh nesting target element yang dapat
    dilakukan pada 'styled-components'
  */
  h2 {
    font-weight: bold;
    margin: 0 6px 0;
    font-size: 16px;
    color: #4a4a4a;
    text-transform: uppercase;
    text-align: center
  }

  @media screen and (min-width: 600px){
    h2{
      font-size: 22px;
    }
  }

  p {
    font-weight: lighter;
    font-size: 16px;
    text-align:center;
  }
`;

export const DirectoryItemContainer = styled.div`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;
  
  &:hover {
    cursor: pointer;
  
    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
  
    & ${DirectoryItemBodyContainer} {
      opacity: 0.9;
    }
  }

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }
`

// .directory-item-container {
//     min-width: 30%;
//     height: 240px;
//     flex: 1 1 auto;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: 1px solid black;
//     margin: 0 7.5px 15px;
//     overflow: hidden;
  
//     &:hover {
//       cursor: pointer;
  
//       & .background-image {
//         transform: scale(1.1);
//         transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
//       }
  
//       & .directory-item-body-container {
//         opacity: 0.9;
//       }
//     }
  
//     &:first-child {
//       margin-right: 7.5px;
//     }
  
//     &:last-child {
//       margin-left: 7.5px;
//     }
  
//     .background-image {
//       width: 100%;
//       height: 100%;
//       background-size: cover;
//       background-position: center;
//     }
  
//     .directory-item-body-container {
//       height: 90px;
//       padding: 0 25px;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       border: 1px solid black;
//       background-color: white;
//       opacity: 0.7;
//       position: absolute;
  
//       h2 {
//         font-weight: bold;
//         margin: 0 6px 0;
//         font-size: 16px;
//         color: #4a4a4a;
//       }

//       @media screen and (min-width: 600px){
//         h2{
//           font-size: 22px;
//         }
//       }
  
//       p {
//         font-weight: lighter;
//         font-size: 16px;
//       }
//     }
// }
  