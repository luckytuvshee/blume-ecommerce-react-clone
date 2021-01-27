import {
  SET_IMAGE_TYPE,
  SET_DRAG_START,
  SET_BACKGROUND_EDIT,
  TOGGLE_SIDEBAR,
} from "../actions/types";

interface state {
  imageType: string;
  dragStart: boolean;
  sidebarOpen: boolean;
  backgroundEdit: boolean;
  loading: boolean;
}

const initialState: state = {
  imageType: "layouts",
  dragStart: false,
  backgroundEdit: false,
  sidebarOpen: true,
  loading: true,
};

const editor = (state = initialState, action: any) => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case SET_IMAGE_TYPE:
      return {
        ...state,
        imageType: payload,
        loading: false,
      };
    case SET_DRAG_START:
      return {
        ...state,
        dragStart: payload,
        loading: false,
      };
    case SET_BACKGROUND_EDIT:
      return {
        ...state,
        backgroundEdit: payload,
        loading: false,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
        loading: false,
      };
    default:
      return state;
  }
};

export default editor;
