import {
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  PRODUCT_ERROR,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  IMAGE_UPLOAD,
} from "../actions/types";

interface state {
  products: [];
  loading: boolean;
}

const initialState: state = {
  products: [],
  loading: true,
};

const product = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product: any) => {
          if (product.id === payload.id) {
            return payload;
          }
          return product;
        }),
        loading: false,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
        loading: false,
      };
    case IMAGE_UPLOAD:
      return state;
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product: any) => product.id !== payload
        ),
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default product;
