import {
  GET_BASKETS,
  UPDATE_BASKET,
  BASKET_ERROR,
  ADD_TO_BASKET,
  DELETE_PRODUCT_FROM_BASKET,
  TOGGLE_BASKET,
} from "./types";
import axios from "axios";

export const getBaskets = () => async (dispatch: any) => {
  try {
    const baskets = await axios.get("/api/baskets");

    dispatch({
      type: GET_BASKETS,
      payload: baskets.data,
    });
  } catch (err) {
    console.log("err");
    console.log(err);
    dispatch({
      type: BASKET_ERROR,
    });
  }
};

export const updateQuantity = (quantity: number, product_id: string) => async (
  dispatch: any
) => {
  try {
    const basketItem = await axios.post("/api/baskets/quantity", {
      product_id,
      quantity,
    });

    dispatch({
      type: UPDATE_BASKET,
      payload: basketItem.data,
    });
  } catch (err) {
    console.log("err");
    console.log(err);
    dispatch({
      type: BASKET_ERROR,
    });
  }
};

export const deleteBasketProduct = (product_id: string) => async (
  dispatch: any
) => {
  try {
    const basketItem = await axios.put("/api/baskets", {
      product_id,
    });

    dispatch({
      type: DELETE_PRODUCT_FROM_BASKET,
      payload: basketItem,
    });
  } catch (err) {
    console.log("err");
    console.log(err);
    dispatch({
      type: BASKET_ERROR,
    });
  }
};

export const addProductToBasket = (
  product_id: string,
  quantity: number
) => async (dispatch: any) => {
  try {
    const res = await axios.post("/api/baskets", {
      product_id,
      quantity,
    });

    const { basketItem, type } = res.data;

    if (type === "update") {
      dispatch({
        type: UPDATE_BASKET,
        payload: basketItem,
      });
    } else if (type === "add") {
      dispatch({
        type: ADD_TO_BASKET,
        payload: basketItem,
      });
    }
  } catch (err) {
    console.log("err");
    console.log(err);
    dispatch({
      type: BASKET_ERROR,
    });
  }
};

export const toggleBasket = () => async (dispatch: any) => {
  dispatch({
    type: TOGGLE_BASKET,
  });
};
