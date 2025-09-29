import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobCard from './JobCard';
import { toggleBookmark } from '../redux/jobsSlice';

const BookmarksPage = () => {
    const dispatch = useDispatch();
    // Select all jobs and the IDs of the bookmarked ones
    const { allJobs, bookmarkedJobIds } = useSelector(state => state.jobs);

    // Find the full job objects for the bookmarked IDs
    const bookmarkedJobs = allJobs.filter(job => bookmarkedJobIds.includes(job.id));

    return (
        <div>
            <h2>Your Bookmarked Jobs</h2>
            {bookmarkedJobs.length > 0 ? (
                bookmarkedJobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        isBookmarked={true} // It's definitely bookmarked on this page
                        onBookmark={() => dispatch(toggleBookmark(job.id))}
                    />
                ))
            ) : (
                <p>You haven't bookmarked any jobs yet.</p>
            )}
        </div>
    );
};

export default BookmarksPage;