import React from "react";
import "./Order.scss";
import moment from "moment";
import CheckoutProduct from "../../Checkout/CheckoutProduct/CheckoutProduct";
import { ICheckoutProductProps } from "../../Checkout/CheckoutProduct/CheckoutProduct.interface";
// @ts-ignore
import CurrencyFormat from "react-currency-format";

function Order({
  order,
}: {
  order: {
    data: { created: number; basket: Array<any>; amount: number };
    id: string;
  };
}) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">{order.id}</p>

      {order.data.basket.map((item: ICheckoutProductProps, idx: number) => (
        <CheckoutProduct
          id={item.id}
          image={item.image}
          price={item.price}
          rating={item.rating}
          title={item.title}
          key={idx}
          hideButton={true}
        />
      ))}

      <CurrencyFormat
        renderText={(value: any) => (
          <>
            <h3 className="order__total">Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        prefix={"₹ "}
      />
    </div>
  );
}

export default Order;
