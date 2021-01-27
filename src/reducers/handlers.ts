import {
  ADD_LAYOUT,
  ADD_OBJECT,
  REMOVE_OBJECT,
  SET_BACKGROUNDS,
  UPDATE_BACKGROUND,
  UPDATE_CONTAINER,
  UPDATE_GROUP_CONTAINER,
  UPDATE_OBJECT,
} from "../actions/types";
import { BackgroundImage, Container, Slide, SlideObject } from "../interfaces";

const getProjectsHandler = (state: any, action: any) => {
  return {
    ...state,
    projects: action.payload,
    fetching: false,
  };
};

const updateProjectsHandler = (state: any, action: any) => {
  const { payload } = action;

  return {
    ...state,
    currentProject: {
      ...state.currentProject,
      ...payload,
    },
    fetching: false,
  };
};

const setCurrentProjectHandler = (state: any, action: any) => {
  return {
    ...state,
    currentProject: action.payload,
  };
};

const setSlideDimensionHandler = (state: any, action: any) => {
  const { payload } = action;

  const { bgStyles, slideWidth, slideHeight } = payload;
  return {
    ...state,
    bgStyles,
    slideWidth,
    slideHeight,
    loading: false,
  };
};

const addProjectHandler = (state: any, action: any) => {
  const { payload } = action;

  return {
    ...state,
    projects: [...state.projects, payload],
    currentProject: payload,
    loading: false,
  };
};

const saveProjectHandler = (state: any, action: any) => {
  const { payload } = action;

  state.currentProject.slides.map((s: Slide) => {
    if (s.slideId === payload.slideId) {
      return payload;
    }
    return s;
  });
  return {
    ...state,
    loading: false,
  };
};

const newSlideHandler = (state: any, action: any) => {
  const { payload } = action;

  state.currentProject.slides.push(payload);
  return {
    ...state,
    loading: false,
  };
};

const deleteSlideHandler = (state: any, action: any) => {
  const { payload } = action;

  const slideIndex = state.currentProject.slides.findIndex(
    (slide: Slide) => slide.slideId === payload
  );
  state.currentProject.slides.splice(slideIndex, 1);
  return {
    ...state,
    loading: false,
  };
};

const loadObjectsHandler = (state: any, action: any) => {
  const { payload } = action;

  return {
    ...state,
    objects: payload,
  };
};

const loadContainersHandler = (state: any, action: any) => {
  const { payload } = action;

  return {
    ...state,
    containers: payload,
  };
};

const loadBackgroundsHandler = (state: any, action: any) => {
  const { payload } = action;

  return {
    ...state,
    backgrounds: payload,
  };
};

const loadErrorHandler = (state: any, action: any) => {
  const { payload } = action;

  console.log("load error");
  console.log(payload);
  return {
    ...state,
    loading: false,
  };
};

const updateHistoryHandler = (state: any, action: any) => {
  const { payload } = action;

  return {
    ...state,
    undoHistory: [...state.undoHistory, payload],
    loading: false,
  };
};

const updateContainerHandler = (state: any, action: any) => {
  const { payload } = action;

  const { container } = payload;

  console.log("update container");
  console.log("container");
  console.log(container);

  return {
    ...state,
    containers: state.containers.map((x: any) => {
      if (x.id === container.id) return container;
      return x;
    }),
    loading: false,
  };
};

const updateGroupContainerHandler = (state: any, action: any) => {
  const { payload } = action;

  const { containers }: { containers: Container[] } = payload;

  return {
    ...state,
    containers: state.containers.map((c: Container) => {
      const updated = containers.find((x: Container) => c.id === x.id);
      if (updated) return updated;
      return c;
    }),
    loading: false,
  };
};

const updateObjectHandler = (state: any, action: any) => {
  const { payload } = action;

  const { object } = payload;

  console.log("update object");
  console.log("object");
  console.log(object);

  return {
    ...state,
    objects: state.objects.map((x: any) => {
      if (x.id === object.id) return object;
      return x;
    }),
    loading: false,
  };
};

const updateBackgroundHandler = (state: any, action: any) => {
  const { payload } = action;

  const { background }: { background: BackgroundImage } = payload;

  return {
    ...state,
    backgrounds: state.backgrounds.map((x: BackgroundImage) => {
      if (x.className === background.className) return { ...x, ...background };
      return x;
    }),
    loading: false,
  };
};

const setBackgroundsHandler = (state: any, action: any) => {
  const { payload } = action;

  const { backgrounds }: { backgrounds: BackgroundImage[] } = payload;

  return {
    ...state,
    backgrounds: state.backgrounds.map((x: BackgroundImage) => {
      const [bg] = backgrounds.filter(
        (b: BackgroundImage) => x.className === b.className
      );
      if (bg) return bg;
      return x;
    }),
    loading: false,
  };
};

const addLayoutHandler = (state: any, action: any) => {
  const { payload } = action;

  const { objects, layout } = payload;

  console.log("layout");
  console.log(layout);

  return {
    ...state,
    objects,
    layout,
    loading: false,
  };
};

const addObjectHandler = (state: any, action: any) => {
  const { payload } = action;

  const { object } = payload;

  return {
    ...state,
    objects: [...state.objects, object],
    loading: false,
  };
};

const removeObjectHandler = (state: any, action: any) => {
  const { payload } = action;

  const { object, container } = payload;

  return {
    ...state,
    objects: state.objects.filter((x: any) => x.id !== object.id),
    containers: state.containers.filter((x: any) => x.id !== container.id),
    loading: false,
  };
};

const undoHandler = (state: any, action: any) => {
  const undo = state.undoHistory.pop();
  const { historyType, props } = undo;

  if (historyType === ADD_OBJECT) {
    const { object } = props;
    return {
      ...state,
      objects: state.objects.filter((x: any) => x.id !== object.id),
      redoHistory: [...state.redoHistory, undo],
      loading: false,
    };
  } else if (historyType === ADD_LAYOUT) {
    const { objects, layout } = props;
    return {
      ...state,
      objects,
      layout,
      redoHistory: [
        ...state.redoHistory,
        {
          historyType: ADD_LAYOUT,
          props: { objects: state.objects, layout: state.layout },
        },
      ],
      loading: false,
    };
  } else if (historyType === REMOVE_OBJECT) {
    const { object, container } = props;
    return {
      ...state,
      objects: [...state.objects, object],
      containers: [...state.containers, container],
      redoHistory: [...state.redoHistory, undo],
      loading: false,
    };
  } else if (historyType === SET_BACKGROUNDS) {
    const { backgrounds }: { backgrounds: BackgroundImage[] } = props;
    return {
      ...state,
      backgrounds,
      redoHistory: [
        ...state.redoHistory,
        {
          historyType: SET_BACKGROUNDS,
          props: { backgrounds: state.backgrounds },
        },
      ],
      loading: false,
    };
  } else if (historyType === UPDATE_BACKGROUND) {
    const { background }: { background: BackgroundImage } = props;

    const [currentBackground] = state.backgrounds.filter(
      (b: BackgroundImage) => b.className === background.className
    );

    return {
      ...state,
      backgrounds: state.backgrounds.map((b: BackgroundImage) => {
        if (b.className === background.className) {
          return {
            ...b,
            ...background,
          };
        }
        return b;
      }),
      redoHistory: [
        ...state.redoHistory,
        {
          historyType: UPDATE_BACKGROUND,
          props: { background: currentBackground },
        },
      ],
      loading: false,
    };
  } else if (historyType === UPDATE_GROUP_CONTAINER) {
    const { containers }: { containers: Container[] } = props;

    const currentContainers: Container[] = state.containers.filter((x: any) =>
      containers.find((c: Container) => c.id === x.id)
    );

    return {
      ...state,
      containers: state.containers.map((c: Container) => {
        const updated = containers.find((x: Container) => c.id === x.id);
        if (updated) return updated;
        return c;
      }),
      redoHistory: [
        ...state.redoHistory,
        {
          historyType: UPDATE_GROUP_CONTAINER,
          props: { containers: currentContainers },
        },
      ],
      loading: false,
    };
  } else if (historyType === UPDATE_OBJECT) {
    const { object } = props;

    const [currentObject] = state.objects.filter(
      (o: any) => o.id === object.id
    );

    return {
      ...state,
      objects: state.objects.map((x: any) => {
        if (x.id === object.id) return object;
        return x;
      }),
      redoHistory: [
        ...state.redoHistory,
        {
          historyType: UPDATE_OBJECT,
          props: { object: currentObject },
        },
      ],
      loading: false,
    };
  }
};

const redoHandler = (state: any, action: any) => {
  const redo = state.redoHistory.pop();
  const { historyType, props } = redo;

  if (historyType === ADD_OBJECT) {
    const { object, container } = props;
    return {
      ...state,
      objects: [...state.objects, object],
      containers: [...state.containers, container],
      undoHistory: [...state.undoHistory, redo],
      loading: false,
    };
  } else if (historyType === ADD_LAYOUT) {
    const { objects, layout } = props;

    return {
      ...state,
      objects,
      layout,
      undoHistory: [
        ...state.undoHistory,
        {
          historyType: ADD_LAYOUT,
          props: { objects: state.objects, layout: state.layout },
        },
      ],
      loading: false,
    };
  } else if (historyType === REMOVE_OBJECT) {
    const { object, container } = props;
    return {
      ...state,
      objects: state.objects.filter((x: any) => x.id !== object.id),
      containers: state.containers.filter((x: any) => x.id !== container.id),
      undoHistory: [...state.undoHistory, redo],
      loading: false,
    };
  } else if (historyType === SET_BACKGROUNDS) {
    const { backgrounds }: { backgrounds: BackgroundImage[] } = props;
    return {
      ...state,
      backgrounds,
      undoHistory: [
        ...state.undoHistory,
        {
          historyType: SET_BACKGROUNDS,
          props: { backgrounds: state.backgrounds },
        },
      ],
      loading: false,
    };
  } else if (historyType === UPDATE_BACKGROUND) {
    const { background }: { background: BackgroundImage } = props;

    const [currentBackground] = state.backgrounds.filter(
      (b: BackgroundImage) => b.className === background.className
    );

    return {
      ...state,
      backgrounds: state.backgrounds.map((b: BackgroundImage) => {
        if (b.className === background.className) {
          return {
            ...b,
            ...background,
          };
        }
        return b;
      }),
      undoHistory: [
        ...state.undoHistory,
        {
          historyType: UPDATE_BACKGROUND,
          props: { background: currentBackground },
        },
      ],
      loading: false,
    };
  } else if (historyType === UPDATE_GROUP_CONTAINER) {
    const { containers }: { containers: Container[] } = props;

    const currentContainers: Container[] = state.containers.filter((x: any) =>
      containers.find((c: Container) => c.id === x.id)
    );

    return {
      ...state,
      containers: state.containers.map((c: Container) => {
        const updated = containers.find((x: Container) => c.id === x.id);
        if (updated) return updated;
        return c;
      }),
      undoHistory: [
        ...state.undoHistory,
        {
          historyType: UPDATE_GROUP_CONTAINER,
          props: { containers: currentContainers },
        },
      ],
      loading: false,
    };
  } else if (historyType === UPDATE_OBJECT) {
    const { object } = props;

    const [currentObject] = state.objects.filter(
      (o: any) => o.id === object.id
    );

    return {
      ...state,
      objects: state.objects.map((x: any) => {
        if (x.id === object.id) return object;
        return x;
      }),
      undoHistory: [
        ...state.undoHistory,
        {
          historyType: UPDATE_OBJECT,
          props: { object: currentObject },
        },
      ],
      loading: false,
    };
  }
};

const slidesErrorHandler = (state: any, action: any) => {
  const { payload } = action;

  console.error("SLIDES_ERROR: " + payload);
  return {
    ...state,
    loading: false,
  };
};

const projectsErrorHandler = (state: any, action: any) => {
  const { payload } = action;

  console.error("PROJECTS_ERROR: " + payload);
  return {
    ...state,
    loading: false,
  };
};

export const projectHandlers = {
  getProjectsHandler,
  updateProjectsHandler,
  setCurrentProjectHandler,
  setSlideDimensionHandler,
  addProjectHandler,
  saveProjectHandler,
  newSlideHandler,
  deleteSlideHandler,
  loadObjectsHandler,
  loadContainersHandler,
  loadBackgroundsHandler,
  loadErrorHandler,
  updateContainerHandler,
  updateGroupContainerHandler,
  updateBackgroundHandler,
  updateObjectHandler,
  setBackgroundsHandler,
  updateHistoryHandler,
  addLayoutHandler,
  addObjectHandler,
  removeObjectHandler,
  undoHandler,
  redoHandler,
  slidesErrorHandler,
  projectsErrorHandler,
};
