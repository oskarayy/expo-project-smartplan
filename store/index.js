import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './reducers/projectSlice';
import taskSlice from './reducers/taskSlice';
import settingsSlice from './reducers/settingsSlice';

export const store = configureStore({
  reducer: {
    projectSlice,
    taskSlice,
    settingsSlice
  }
});
