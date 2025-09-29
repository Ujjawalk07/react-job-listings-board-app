import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// This is an "async thunk" for fetching our data.
// It allows us to perform asynchronous logic.
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await fetch('/jobs.json'); // Fetch from the public folder
  const data = await response.json();
  return data;
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    allJobs: [], // This will hold all jobs from the JSON
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    // Filters and search state
    filters: {
      keyword: '',
      company: '',
      location: '',
    },
    sortBy: 'newest', // 'newest' | 'salary'
    bookmarkedJobIds: [], // An array to hold IDs of bookmarked jobs
    currentPage: 1, // For pagination
  },
  // Reducers are functions that define how the state can be updated.
  reducers: {
    setFilters: (state, action) => {
      // action.payload will be an object like { keyword: 'developer' }
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page on filter change
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload; // payload will be 'newest' or 'salary'
    },
    toggleBookmark: (state, action) => {
      const jobId = action.payload; // payload is the job ID
      const index = state.bookmarkedJobIds.indexOf(jobId);
      if (index >= 0) {
        // If it's already bookmarked, remove it
        state.bookmarkedJobIds.splice(index, 1);
      } else {
        // Otherwise, add it
        state.bookmarkedJobIds.push(jobId);
      }
    },
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
    }
  },
  // This handles the state for our async thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allJobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the actions so we can use them in our components
export const { setFilters, setSortBy, toggleBookmark, setCurrentPage } = jobsSlice.actions;

// Export the reducer to be used in the store
export default jobsSlice.reducer;