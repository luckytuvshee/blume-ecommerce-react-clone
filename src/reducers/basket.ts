import { GET_PRODUCTS, BASKET_ERROR, GET_BASKETS } from "../actions/types";

interface state {
  baskets: [];
  loading: boolean;
}

const initialState: state = {
  baskets: [],
  loading: true,
};

const basket = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case GET_BASKETS:
      return {
        ...state,
        baskets: payload,
        loading: false,
      };
    case BASKET_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default basket;
