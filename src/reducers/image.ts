import { GET_IMAGES, ADD_IMAGE, IMAGE_ERROR } from "../actions/types";

interface state {
  images: string[];
  loading: boolean;
}

const initialState: state = {
  images: [],
  loading: true,
};

const image = (state = initialState, action: any) => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case GET_IMAGES:
      return {
        ...state,
        images: payload,
        loading: false,
      };
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, payload],
        loading: false,
      };
    case IMAGE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default image;
