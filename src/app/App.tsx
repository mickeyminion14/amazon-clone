import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Features/Home/Home";
import Checkout from "./components/Features/Checkout/Checkout";
import Login from "./components/Features/Login/Login";
import { useStateValue } from "./context-api/StateProvider";
import { auth } from "./firebase/firebase";
import { STORE_ACTIONS } from "./constants/store.actions";
import Payment from "./components/Features/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Features/Orders/Orders";

const promise = loadStripe(
  "pk_test_51HgXwkGAL7El0Bfu1cmHcQ7ZQhE2dQTvGs8vYqt42RoxTYXpv0FJsU6hjWzKyDlQiJFb9ciZ2aUGMB0WesCo5liD00cBY2qg3S"
);
function App() {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        dispatch({
          type: STORE_ACTIONS.setUser,
          user: authUser,
        });
      } else {
        //user logged out
        dispatch({
          type: STORE_ACTIONS.setUser,
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
