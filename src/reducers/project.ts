import {
  GET_PROJECTS,
  ADD_LAYOUT,
  ADD_PROJECT,
  PROJECTS_ERROR,
  SAVE_PROJECT,
  NEW_SLIDE,
  SLIDES_ERROR,
  DELETE_SLIDE,
  UPDATE_HISTORY,
  ADD_OBJECT,
  REMOVE_OBJECT,
  UNDO,
  REDO,
  LOAD_ERROR,
  LOAD_BACKGROUNDS,
  LOAD_CONTAINERS,
  LOAD_OBJECTS,
  SET_SLIDE_DIMENSION,
  SET_CURRENT_PROJECT,
  UPDATE_CONTAINER,
  UPDATE_GROUP_CONTAINER,
  UPDATE_BACKGROUND,
  SET_BACKGROUNDS,
  UPDATE_OBJECT,
  UPDATE_PROJECT,
} from "../actions/types";
import { Project } from "../interfaces";
import { projectHandlers } from "./handlers";

interface state {
  projects: Object[];
  currentProject: Project;
  undoHistory: Object[];
  redoHistory: Object[];
  bgStyles: Object;
  slideHeight: number;
  slideWidth: number;
  slideIndex: number;
  objects: any[];
  containers: any[];
  backgrounds: any[];
  layout: {
    left: { count: number; index: number };
    right: { count: number; index: number };
  };
  layouts: any;
  loading: boolean;
  fetching: boolean;
}

const initialState: state = {
  projects: [],
  currentProject: {
    paperSize: "14x11",
    slides: [
      {
        name: "slide 1",
        containers: [
          {
            id: "slideInitialId",
            className: "object",
            style: { top: 100, left: 100 },
          },
        ],
        backgrounds: [{}],
        objects: [{}],
        slideId: "",
      },
    ],
  },
  bgStyles: {},
  slideWidth: 0,
  slideHeight: 0,
  slideIndex: 0,
  objects: [],
  containers: [],
  backgrounds: [],
  undoHistory: [],
  redoHistory: [],
  layout: {
    left: { count: -1, index: -1 },
    right: { count: -1, index: -1 },
  },
  layouts: [
    {
      count: 4,
      layouts: [
        {
          index: 0,
          objects: [
            { top: 0, width: 50, left: 0, height: 50 },
            { top: 0, width: 50, left: 50, height: 50 },
            { top: 50, width: 50, left: 0, height: 50 },
            { top: 50, width: 50, left: 50, height: 50 },
          ],
        },
        {
          index: 1,
          objects: [
            { top: 0, width: 50, left: 0, height: 55 },
            { top: 0, width: 50, left: 50, height: 45 },
            { top: 55, width: 50, left: 0, height: 45 },
            { top: 45, width: 50, left: 50, height: 55 },
          ],
        },
      ],
    },
    {
      count: 3,
      layouts: [
        {
          index: 0,
          objects: [
            { top: 0, width: 100, left: 0, height: 50 },
            { top: 50, width: 50, left: 0, height: 50 },
            { top: 50, width: 50, left: 50, height: 50 },
          ],
        },
        {
          index: 1,
          objects: [
            { top: 0, width: 50, left: 0, height: 50 },
            { top: 50, width: 50, left: 0, height: 50 },
            { top: 0, width: 50, left: 50, height: 100 },
          ],
        },
      ],
    },
    {
      count: 2,
      layouts: [
        {
          index: 0,
          objects: [
            { top: 0, width: 100, left: 0, height: 50 },
            { top: 50, width: 100, left: 0, height: 50 },
          ],
        },
        {
          index: 1,
          objects: [
            { top: 8, width: 80, left: 10, height: 40 },
            { top: 52, width: 80, left: 10, height: 40 },
          ],
        },
        {
          index: 2,
          objects: [
            { top: 0, width: 50, left: 0, height: 100 },
            { top: 0, width: 50, left: 50, height: 100 },
          ],
        },
      ],
    },
    {
      count: 1,
      layouts: [
        {
          index: 0,
          objects: [{ top: 0, width: 100, left: 0, height: 100 }],
        },
        {
          index: 1,
          objects: [{ top: 10, width: 80, left: 10, height: 80 }],
        },
        {
          index: 2,
          objects: [{ top: 20, width: 60, left: 20, height: 60 }],
        },
      ],
    },
  ],
  loading: true,
  fetching: true,
};

const handlers: any = {};
handlers[GET_PROJECTS] = projectHandlers.getProjectsHandler;
handlers[UPDATE_PROJECT] = projectHandlers.updateProjectsHandler;
handlers[SET_CURRENT_PROJECT] = projectHandlers.setCurrentProjectHandler;
handlers[SET_SLIDE_DIMENSION] = projectHandlers.setSlideDimensionHandler;
handlers[ADD_PROJECT] = projectHandlers.addProjectHandler;
handlers[SAVE_PROJECT] = projectHandlers.saveProjectHandler;
handlers[NEW_SLIDE] = projectHandlers.newSlideHandler;
handlers[DELETE_SLIDE] = projectHandlers.deleteSlideHandler;
handlers[LOAD_OBJECTS] = projectHandlers.loadObjectsHandler;
handlers[LOAD_CONTAINERS] = projectHandlers.loadContainersHandler;
handlers[LOAD_BACKGROUNDS] = projectHandlers.loadBackgroundsHandler;
handlers[LOAD_ERROR] = projectHandlers.loadErrorHandler;
handlers[UPDATE_CONTAINER] = projectHandlers.updateContainerHandler;
handlers[UPDATE_GROUP_CONTAINER] = projectHandlers.updateGroupContainerHandler;
handlers[UPDATE_BACKGROUND] = projectHandlers.updateBackgroundHandler;
handlers[UPDATE_OBJECT] = projectHandlers.updateObjectHandler;
handlers[SET_BACKGROUNDS] = projectHandlers.setBackgroundsHandler;
handlers[UPDATE_HISTORY] = projectHandlers.updateHistoryHandler;
handlers[ADD_LAYOUT] = projectHandlers.addLayoutHandler;
handlers[ADD_OBJECT] = projectHandlers.addObjectHandler;
handlers[REMOVE_OBJECT] = projectHandlers.removeObjectHandler;
handlers[UNDO] = projectHandlers.undoHandler;
handlers[REDO] = projectHandlers.redoHandler;
handlers[SLIDES_ERROR] = projectHandlers.slidesErrorHandler;
handlers[PROJECTS_ERROR] = projectHandlers.projectsErrorHandler;

const project = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const handler = handlers[action.type];

  if (handler) return handler(state, action);

  return state;
};

export default project;
