import { IState } from "./../constants/interface";
import { STORE_ACTIONS } from "./../constants/store.actions";
export const initialState: IState = {
  basket: [],
  user: null,
};

export const reducer = (state: any, action?: any) => {
  switch (action.type) {
    case STORE_ACTIONS.addToBasket:
      //LOGIC FOR ADDING TO BASKET

      return { ...state, basket: [...state.basket, action.item] };

    case STORE_ACTIONS.removeFromBaset:
      //LOGIC FOR REMOVING FROM BASKET

      const arr: Array<any> = [...state.basket];
      let idxToRemove = arr.findIndex((item) => item.id === action.item);
      arr.splice(idxToRemove, 1);
      return { ...state, basket: [...arr] };

    case STORE_ACTIONS.setUser:
      return { ...state, user: action.user };

    case STORE_ACTIONS.emptyBasket:
      return { ...state, basket: [] };
    default:
      return state;
  }
};

export const getBasketTotal = (basket: Array<any>) => {
  return basket.reduce((amount, item) => item.price + amount, 0);
};
