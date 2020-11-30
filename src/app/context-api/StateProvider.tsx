import { createContext, useContext, useReducer } from "react";
import React from "react";

//data layer
export const StateContext = createContext([]);

//build a provider
export const StateProvider = ({ reducer, initialState, children }: any) => (
  <StateContext.Provider value={useReducer(reducer, initialState) as any}>
    {children}
  </StateContext.Provider>
);

// this is how we use it inside of a component

export const useStateValue = (): any => useContext(StateContext);
