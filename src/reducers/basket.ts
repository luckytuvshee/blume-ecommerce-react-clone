import {
  BASKET_ERROR,
  GET_BASKETS,
  CLEAR_BASKET,
  UPDATE_BASKET,
  ADD_TO_BASKET,
  TOGGLE_BASKET,
  DELETE_PRODUCT_FROM_BASKET,
  UPDATE_BASKET_PRODUCT,
} from "../actions/types";

interface state {
  baskets: [];
  basketOpen: boolean;
  loading: boolean;
}

const initialState: state = {
  baskets: [],
  basketOpen: false,
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
    case UPDATE_BASKET:
      return {
        ...state,
        baskets: state.baskets.map((basket: any) => {
          if (basket.product_id === payload.product_id) {
            return {
              ...basket,
              quantity: basket.quantity + payload.quantity,
            };
          }
          return basket;
        }),
        loading: false,
      };
    case ADD_TO_BASKET:
      return {
        ...state,
        baskets: [...state.baskets, payload],
        loading: false,
      };
    case TOGGLE_BASKET:
      return {
        ...state,
        basketOpen: !state.basketOpen,
        loading: false,
      };
    case UPDATE_BASKET_PRODUCT:
      return {
        ...state,
        baskets: state.baskets.map((basket: any) => {
          if (basket.product_id === payload.id) {
            return {
              ...basket,
              title: payload.title,
              slug: payload.slug,
              description: payload.description,
              price: payload.price,
              url: payload.url,
            };
          }
          return basket;
        }),
        loading: false,
      };
    case DELETE_PRODUCT_FROM_BASKET:
      return {
        ...state,
        baskets: state.baskets.filter(
          (basket: any) => basket.product_id !== payload.product_id
        ),
        loading: false,
      };

    case CLEAR_BASKET:
      return {
        ...state,
        baskets: [],
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
