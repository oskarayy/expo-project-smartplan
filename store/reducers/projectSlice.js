import { createSlice } from '@reduxjs/toolkit';
import { getProjectProgress } from '../../utils/getProjectProgress';

const categories = [
  { id: 'all', name: 'Wszystkie', icon: 'layers-outline' },
  { id: 'love', name: 'Miłość', icon: 'heart-outline' },
  { id: 'health', name: 'Zdrowie', icon: 'pulse-outline' },
  { id: 'career', name: 'Kariera', icon: 'briefcase-outline' },
  { id: 'finances', name: 'Finanse', icon: 'wallet-outline' },
  { id: 'soul', name: 'Dusza', icon: 'rose-outline' },
  { id: 'relations', name: 'Relacje', icon: 'people-outline' }
];

import { sendProjects } from '../../utils/storage';

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    // projects: Array.isArray(projects) ? projects : [],
    projects: [],
    categories
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      const newProject = action.payload;
      state.projects = [...state.projects, newProject];
      sendProjects(state.projects);
    },
    removeProject: (state, action) => {
      const updatedList = state.projects.filter(
        (project) => project.id !== action.payload
      );
      state.projects = updatedList;
      sendProjects(state.projects);
    },
    updateProject: (state, action) => {
      const activeProjectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      state.projects[activeProjectIndex] = {
        ...state.projects[activeProjectIndex],
        ...action.payload
      };
      sendProjects(state.projects);
    },
    updateActiveTasks: (state, action) => {
      const { delta, finished, active } = action.payload;
      const activeProjectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      let updatedProject;
      if (delta) {
        updatedProject = {
          ...state.projects[activeProjectIndex],
          tasks: {
            active:
              state.projects[activeProjectIndex].tasks.active + -1 * delta,
            finished:
              state.projects[activeProjectIndex].tasks.finished + 1 * delta
          }
        };
      } else {
        updatedProject = {
          ...state.projects[activeProjectIndex],
          tasks: {
            active: state.projects[activeProjectIndex].tasks.active - active,
            finished:
              state.projects[activeProjectIndex].tasks.finished - finished
          }
        };
      }
      state.projects[activeProjectIndex] = {
        ...updatedProject,
        previousProgress: state.projects[activeProjectIndex].progress,
        progress: getProjectProgress(updatedProject)
      };
      sendProjects(state.projects);
    }
  }
});

export const setProjects = projectSlice.actions.setProjects;
export const addProject = projectSlice.actions.addProject;
export const removeProject = projectSlice.actions.removeProject;
export const updateProject = projectSlice.actions.updateProject;
export const updateActiveTasks = projectSlice.actions.updateActiveTasks;

export default projectSlice.reducer;
