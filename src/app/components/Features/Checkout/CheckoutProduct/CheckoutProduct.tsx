import React from "react";
import { STORE_ACTIONS } from "../../../../constants/store.actions";
import { useStateValue } from "../../../../context-api/StateProvider";
import { ICheckoutProductProps } from "./CheckoutProduct.interface";
import "./CheckoutProduct.scss";
function CheckoutProduct({
  id,
  image,
  price,
  rating,
  title,
  hideButton,
}: ICheckoutProductProps) {
  const [, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: STORE_ACTIONS.removeFromBaset,
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill("")
            .map((_, i) => (
              <span aria-label="star" role="img" key={i}>
                ⭐
              </span>
            ))}
        </div>
        {!hideButton ? (
          <button onClick={removeFromBasket}>Remove from basket</button>
        ) : null}
      </div>
    </div>
  );
}

export default CheckoutProduct;
