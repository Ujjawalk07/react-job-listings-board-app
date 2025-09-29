import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';

export const store = configureStore({
  reducer: {
    // We tell the store about our slice and its reducer
    jobs: jobsReducer,
  },
});