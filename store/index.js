import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './reducers/projectSlice';
import taskSlice from './reducers/taskSlice';

export const store = configureStore({
  reducer: {
    projectSlice,
    taskSlice
  }
});
