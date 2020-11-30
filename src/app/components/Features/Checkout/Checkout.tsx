import React, { Fragment } from "react";
import { useStateValue } from "../../../context-api/StateProvider";
import "./Checkout.scss";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";
import { ICheckoutProductProps } from "./CheckoutProduct/CheckoutProduct.interface";
import Subtotal from "./Subtotal/Subtotal";
import { useHistory } from "react-router-dom";

function Checkout() {
  const [{ basket, user }] = useStateValue();
  const history = useHistory();

  const routeToLogin = () => {
    history.push("/login");
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/affordability/phase2/Phase2_Bank_PC_1500x140.jpg"
          alt=""
        />
        {basket.length ? (
          <div>
            <h2 className="checkout__title">Your Amazon Basket</h2>
            {basket.map((item: ICheckoutProductProps, idx: number) => (
              <CheckoutProduct
                id={item.id}
                image={item.image}
                price={item.price}
                rating={item.rating}
                title={item.title}
                key={idx}
              />
            ))}
          </div>
        ) : (
          <Fragment>
            {/* <img
            className="checkout__ad"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/affordability/phase2/Phase2_Bank_PC_1500x140.jpg"
            alt=""
          /> */}
            <div className="checkout__info">
              <div className="checkout__infoWrapper">
                <strong>
                  Pay faster for all your shopping needs with Amazon Pay balance
                </strong>

                <p>
                  Get Instant refund on cancellations | Zero payment failures
                </p>
              </div>
              <div className="checkout__empty">
                <img
                  className="checkout__emptyImage"
                  src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
                  alt=""
                />
                <div className="checkout__accountOptions">
                  <h2>Your Amazon Basket is empty</h2>
                  <div className="checkout__btnContainer">
                    {!user ? (
                      <Fragment>
                        <button onClick={routeToLogin} className="btn-primary">
                          Sign in to your account
                        </button>
                        <button
                          onClick={routeToLogin}
                          className="btn-secondary"
                        >
                          Sign up now
                        </button>
                      </Fragment>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="checkout__warning">
                <p>
                  The price and availability of items at Amazon.in are subject
                  to change. The shopping cart is a temporary place to store a
                  list of your items and reflects each item's most recent price.
                  Do you have apromotional code?
                </p>
                <p>
                  We'll ask you to enter your claim code when it's time to pay.
                </p>
              </div>
            </div>
          </Fragment>
        )}
      </div>
      {basket.length ? (
        <div className="checkout__right">
          <Subtotal />
        </div>
      ) : null}
    </div>
  );
}

export default Checkout;
