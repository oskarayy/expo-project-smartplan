import { createSlice } from '@reduxjs/toolkit';
import { sendSettings } from '../../utils/storage';
import { Colors } from '../../constants/Colors';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    options: {
      accentColor: Colors.accent,
      notificationsTime: ['12', '00']
    }
  },
  reducers: {
    updateOptions: (state, action) => {
      state.options = action.payload;
      sendSettings(state.options);
    }
  }
});

export const updateOptions = settingsSlice.actions.updateOptions;

export default settingsSlice.reducer;
