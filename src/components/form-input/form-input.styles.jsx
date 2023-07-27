import styled, {css} from 'styled-components';

const subColor = "grey";
const mainColor = "black";

/*
  'css' digunakan untuk membuat block css yang bisa ditambahkan
  kedalam selector element tertentu, seperti @mixin
*/
const shrinkLabel = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

/*
  'FormInputLabel' dideklarasikan sebelum 'FormInputStyle' dikarenakan
  didalam 'FormInputStyle' ada selector yang menargetkan 'FormInputLabel',
  sehingga 'FormInputLabel' perlu dideklarasikan terlebih dahulu.
*/
export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  /*
    Code dibawah memiliki makna, apabila ada 'shrink' props
    yang dikirimkan dari 'form-input.component.jsx' dan bernilai
    true / truthy, maka akan memiliki style seperti style yang berada
    dialam 'shrinkLabel'
  */
  ${(props) => props.shrink && shrinkLabel}
`;

export const FormInputStyle = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabel}
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

// $sub-color: grey;
// $main-color: black;

// @mixin shrinkLabel {
//   top: -14px;
//   font-size: 12px;
//   color: $main-color;
// }

// .group {
//   position: relative;
//   margin: 45px 0;

//   .form-input {
//     background: none;
//     background-color: white;
//     color: $sub-color;
//     font-size: 18px;
//     padding: 10px 10px 10px 5px;
//     display: block;
//     width: 100%;
//     border: none;
//     border-radius: 0;
//     border-bottom: 1px solid $sub-color;
//     margin: 25px 0;

//     &:focus {
//       outline: none;
//     }

//     &:focus ~ .form-input-label {
//       @include shrinkLabel();
//     }
//   }

//   input[type='password'] {
//     letter-spacing: 0.3em;
//   }

//   .form-input-label {
//     color: $sub-color;
//     font-size: 16px;
//     font-weight: normal;
//     position: absolute;
//     pointer-events: none;
//     left: 5px;
//     top: 10px;
//     transition: 300ms ease all;

//     &.shrink {
//       @include shrinkLabel();
//     }
//   }
// }
