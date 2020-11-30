import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getBasketTotal } from "../../../context-api/Reducer";
import { useStateValue } from "../../../context-api/StateProvider";
import CheckoutProduct from "../Checkout/CheckoutProduct/CheckoutProduct";
import { ICheckoutProductProps } from "../Checkout/CheckoutProduct/CheckoutProduct.interface";
import "./Payment.scss";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { axiosInstance as axios } from "../../../axios/axios";
import { STORE_ACTIONS } from "../../../constants/store.actions";
import { db } from "../../../firebase/firebase";
function Payment() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [error, setError] = useState<any>(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  useEffect(() => {
    // generate client secret

    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    if (basket.length) {
      getClientSecret();
    }
  }, [basket]);

  const handleSubmit = async (event: any) => {
    //do all the fancy stripe stuff
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      ?.confirmCardPayment(clientSecret!, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
        },
      })
      .then(({ paymentIntent }) => {
        console.log(user, paymentIntent);

        db.collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent?.id)
          .set({
            basket: basket,
            amount: paymentIntent?.amount,
            created: paymentIntent?.created,
          });

        setSucceeded(true);

        setError(null);
        setProcessing(false);
        dispatch({
          type: STORE_ACTIONS.emptyBasket,
        });
        history.replace("/orders");
      });
  };

  const handleCardElementChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);

    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
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
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
                onChange={handleCardElementChange}
              />
              {error && <div className="payment__cardError">{error}</div>}
              <div>
                <CurrencyFormat
                  renderText={(value: any) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  prefix={"₹ "}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
