import React, { useEffect, useState } from "react";
import { useStateValue } from "../../../context-api/StateProvider";
import { auth, db } from "../../../firebase/firebase";
import Order from "./Order/Order";
import "./Orders.scss";
function Orders() {
  const [orders, setOrders] = useState<Array<any>>([]);
  useEffect(() => {
    let unsubscribe: any = null;
    const unsubscribeUser = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        unsubscribe = db
          .collection("users")
          .doc(authUser.uid)
          .collection("orders")
          .orderBy("created", "desc")
          .onSnapshot((snapshot) => {
            setOrders(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
      } else {
        setOrders([]);
      }
    });

    return () => {
      unsubscribeUser();
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
