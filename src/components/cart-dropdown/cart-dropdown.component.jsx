import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import CustomButton from "../custom-button/custom-button.component";
import './cart-dropdown.styles.scss';

const CartDropdown = () => (
  <div className={'cart-dropdown'}>
    <div className={'cart-items'}>
      <CustomButton>Go to checkout</CustomButton>
    </div>
  </div>
)

export default CartDropdown;