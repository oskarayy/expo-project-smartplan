import { createSlice } from '@reduxjs/toolkit';
import { getProjectProgress } from '../../utils/getProjectProgress';

const dummy_proj = [
  {
    id: 'p1',
    title: 'Książka',
    desc: 'Napisanie książki, w której podziele się moją wiedzą na temat tego jak być szczęśliwy w świecie, w którym popkultura wpycha nas w objęcia depresji każdego dnia.',
    category: 'soul',
    progress: 50,
    tasks: {
      active: 4,
      finished: 4
    },
    deadline: '2023-01-19'
  },
  {
    id: 'p2',
    title: 'Nowa praca',
    category: 'career',
    progress: 0,
    tasks: {
      active: 0,
      finished: 0
    },
    deadline: '2023-01-24'
  },
  {
    id: 'p3',
    title: 'Zdowe ciało',
    category: 'health',
    progress: 0,
    tasks: {
      active: 2,
      finished: 0
    },
    deadline: '2023-02-04'
  },
  {
    id: 'p4',
    title: 'Własne mieszkanie',
    category: 'finances',
    progress: 100,
    tasks: {
      active: 0,
      finished: 1
    },
    deadline: '2023-02-02'
  }
];

const categories = [
  { id: 'all', name: 'Wszystkie', icon: 'layers-outline' },
  { id: 'love', name: 'Miłość', icon: 'heart-outline' },
  { id: 'health', name: 'Zdrowie', icon: 'pulse-outline' },
  { id: 'career', name: 'Kariera', icon: 'briefcase-outline' },
  { id: 'finances', name: 'Finanse', icon: 'wallet-outline' },
  { id: 'soul', name: 'Dusza', icon: 'rose-outline' },
  { id: 'relations', name: 'Relacje', icon: 'people-outline' }
];

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: dummy_proj,
    categories
  },
  reducers: {
    addProject: (state, action) => {
      const newProject = action.payload;
      state.projects = [...state.projects, newProject];
    },
    removeProject: (state, action) => {
      const updatedList = state.projects.filter(
        (project) => project.id !== action.payload.id
      );
      state.projects = updatedList;
    },
    updateProject: (state, action) => {
      console.log(action.payload);
      const activeProjectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      state.projects[activeProjectIndex] = {
        ...state.projects[activeProjectIndex],
        ...action.payload
      };
    },
    updateActiveTasks: (state, action) => {
      const { delta } = action.payload;
      const activeProjectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      const updatedProject = {
        ...state.projects[activeProjectIndex],
        tasks: {
          active: state.projects[activeProjectIndex].tasks.active + -1 * delta,
          finished:
            state.projects[activeProjectIndex].tasks.finished + 1 * delta
        }
      };
      state.projects[activeProjectIndex] = {
        ...updatedProject,
        previousProgress: state.projects[activeProjectIndex].progress,
        progress: getProjectProgress(updatedProject)
      };
    }
  }
});

export const addProject = projectSlice.actions.addProject;
export const removeProject = projectSlice.actions.removeProject;
export const updateProject = projectSlice.actions.updateProject;
export const updateActiveTasks = projectSlice.actions.updateActiveTasks;

export default projectSlice.reducer;
