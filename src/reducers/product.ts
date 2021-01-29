import { GET_PRODUCTS, PRODUCT_ERROR } from "../actions/types";

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
