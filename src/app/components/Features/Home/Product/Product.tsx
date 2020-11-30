import React from "react";
import { STORE_ACTIONS } from "../../../../constants/store.actions";
import { useStateValue } from "../../../../context-api/StateProvider";
import { ProductProps } from "./Product.interface";
import "./Product.scss";

function Product({ id, image, price, rating, title }: ProductProps) {
  const [, dispatch] = useStateValue();

  const addToBasket = () => {
    //add item to basket

    dispatch({
      type: STORE_ACTIONS.addToBasket,
      item: { id, image, price, rating, title },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill("")
            .map((_, i) => (
              <span aria-label="star" role="img" key={i}>
                ⭐
              </span>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
