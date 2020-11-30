import React from "react";
import "./Subtotal.scss";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../../../context-api/StateProvider";
import { getBasketTotal } from "../../../../context-api/Reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const [{ basket }] = useStateValue();
  const history = useHistory();
  const routeToPayment = () => {
    history.push("/payment");
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value: any) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{` ${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        prefix={"₹ "}
      />
      <button onClick={routeToPayment}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
