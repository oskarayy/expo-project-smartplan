import { createSlice } from '@reduxjs/toolkit';
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
    },
    updateNotificationId: (state, action) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (taskIndex === -1) return;
      state.tasks[taskIndex].notificationId = action.payload.notificationId;
    }
  }
});

export const setTasks = taskSlice.actions.setTasks;
export const addTask = taskSlice.actions.addTask;
export const removeTask = taskSlice.actions.removeTask;
export const toggleTaskState = taskSlice.actions.toggleTaskState;
export const updateNotificationId = taskSlice.actions.updateNotificationId;

export default taskSlice.reducer;
