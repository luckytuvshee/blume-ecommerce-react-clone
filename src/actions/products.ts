import {
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  PRODUCT_ERROR,
  DELETE_PRODUCT,
  IMAGE_UPLOAD,
} from "./types";
import { updateBasketProduct } from "./baskets";
import Swal from "sweetalert2";
import axios from "axios";

export const getProducts = () => async (dispatch: any) => {
  try {
    const products = await axios.get("/api/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: products.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

export const updateProduct = (body: any) => async (dispatch: any) => {
  try {
    const res = await axios.put("/api/products", body);

    console.log("res");
    console.log(res.data);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });

    dispatch(updateBasketProduct(res.data));

    return true;
  } catch (err) {
    Swal.fire("Error!", err.response.data, "error");

    dispatch({
      type: PRODUCT_ERROR,
    });

    return false;
  }
};

export const createProduct = (body: any) => async (dispatch: any) => {
  try {
    const res = await axios.post("/api/products", body);

    console.log("res");
    console.log(res.data);

    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data,
    });

    return true;
  } catch (err) {
    // Swal.fire("Error!", err.response.data, "error");
    Swal.fire("Error!", "Duplicate title, Please change your title", "error");

    dispatch({
      type: PRODUCT_ERROR,
    });

    return false;
  }
};

export const imageUpload = (image: any) => async (dispatch: any) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("/api/products/image", formData);

    dispatch({
      type: IMAGE_UPLOAD,
    });

    return res.data;
  } catch (err) {
    Swal.fire("Error!", err.response.data, "error");

    dispatch({
      type: PRODUCT_ERROR,
    });

    return "";
  }
};

export const deleteProduct = (id: string) => async (dispatch: any) => {
  try {
    await axios.delete(`/api/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
    return true;
  } catch (err) {
    // Swal.fire("Error!", err.response.data, "error");
    Swal.fire(
      "Error!",
      `Can't delete product because someone added it to their basket :)`,
      "error"
    );

    dispatch({
      type: PRODUCT_ERROR,
    });
    return false;
  }
};
