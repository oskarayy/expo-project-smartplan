import { createSlice } from '@reduxjs/toolkit';

const dummy_tasks = [
  {
    id: 't1',
    task: 'Wypisać propozycje rozdziałów',
    projectId: 'p1',
    deadline: '2023-01-19',
    finished: true
  },
  {
    id: 't2',
    task: 'Wymyślić okładkę',
    projectId: 'p1',
    deadline: '2023-01-20',
    finished: true
  },
  {
    id: 't3',
    task: 'Napisać pierwsze 10 stron',
    projectId: 'p1',
    deadline: '2023-01-21',
    finished: true
  },
  {
    id: 't4',
    task: 'Zrobić 10 pompek',
    projectId: 'p3',
    deadline: '2023-02-13',
    finished: false
  },
  {
    id: 't5',
    task: 'Zrobić 10 przysiadów',
    projectId: 'p3',
    deadline: '2023-02-12',
    finished: false
  },
  {
    id: 't6',
    task: 'Rozejrzeć się po OLX i OtoDom',
    projectId: 'p4',
    deadline: '2023-02-01',
    finished: true
  },
  {
    id: 't7',
    task: 'Przeczytać co najmniej 20 stron Atomowych nawyków, a później zrobić ogromną notatkę',
    projectId: 'p1',
    deadline: '2023-02-01',
    finished: true
  },
  {
    id: 't8',
    task: 'Przeczytać co najmniej 20 stron Atomowych nawyków, a później zrobić ogromną notatkę',
    projectId: 'p1',
    deadline: '2023-03-01',
    finished: false
  },
  {
    id: 't9',
    task: 'Przeczytać co najmniej 20 stron Atomowych nawyków, a później zrobić ogromną notatkę',
    projectId: 'p1',
    deadline: '2023-02-24',
    finished: false
  },
  {
    id: 't10',
    task: 'Przeczytać co najmniej 20 stron Atomowych nawyków, a później zrobić ogromną notatkę',
    projectId: 'p1',
    deadline: '2023-02-24',
    finished: false
  },
  {
    id: 't11',
    task: 'Przeczytać co najmniej 20 stron Atomowych nawyków, a później zrobić ogromną notatkę',
    projectId: 'p1',
    deadline: '2023-02-24',
    finished: false
  }
];

import { sendTasks } from '../../utils/storage';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: []
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      const newTask = action.payload;
      state.tasks = [...state.tasks, newTask];
      sendTasks(state.tasks);
    },
    removeTask: (state, action) => {
      let updatedList;
      if (action.payload.mode === 'single') {
        updatedList = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      } else if (action.payload.mode === 'multi') {
        updatedList = state.tasks.filter(
          (task) => task.projectId !== action.payload.id
        );
      }
      state.tasks = updatedList;
      sendTasks(updatedList);
    },
    toggleTaskState: (state, action) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      if (taskIndex === -1) return;
      state.tasks[taskIndex].finished = !state.tasks[taskIndex].finished;
      sendTasks(state.tasks);
    }
  }
});

export const setTasks = taskSlice.actions.setTasks;
export const addTask = taskSlice.actions.addTask;
export const removeTask = taskSlice.actions.removeTask;
export const toggleTaskState = taskSlice.actions.toggleTaskState;

export default taskSlice.reducer;
