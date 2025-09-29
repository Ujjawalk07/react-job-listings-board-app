import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobCard from './JobCard';
import { fetchJobs, toggleBookmark, setCurrentPage } from '../redux/jobsSlice';

// This is a "selector" function. It's a best practice for complex filtering.
// It takes the entire Redux state and returns only the data we need.
const selectFilteredJobs = (state) => {
  const { allJobs, filters, sortBy, bookmarkedJobIds } = state.jobs;

  // Filtering logic
  let filteredJobs = allJobs.filter(job =>
    (job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
     job.company.toLowerCase().includes(filters.keyword.toLowerCase())) &&
    job.company.toLowerCase().includes(filters.company.toLowerCase()) &&
    job.location.toLowerCase().includes(filters.location.toLowerCase())
  );

  // Sorting logic
  if (sortBy === 'salary') {
    filteredJobs.sort((a, b) => b.salary - a.salary); // Highest salary first
  } else { // 'newest'
    filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  }

  return {
    jobs: filteredJobs,
    bookmarkedJobIds: bookmarkedJobIds
  };
};


const JobList = () => {
  const dispatch = useDispatch();
  const { status, error, currentPage } = useSelector(state => state.jobs);

  // We use our complex selector here
  const { jobs, bookmarkedJobIds } = useSelector(selectFilteredJobs);

  // We only want to show a certain number of jobs per page
  const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);


  useEffect(() => {
    // Fetch jobs only if they haven't been fetched yet
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);


  if (status === 'loading') {
    return <div>Loading jobs...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {currentJobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          isBookmarked={bookmarkedJobIds.includes(job.id)}
          onBookmark={() => dispatch(toggleBookmark(job.id))}
        />
      ))}

      {/* Pagination Controls */}
      <div className="pagination">
          <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>
              Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={currentPage === totalPages}>
              Next
          </button>
      </div>
    </div>
  );
};

export default JobList;