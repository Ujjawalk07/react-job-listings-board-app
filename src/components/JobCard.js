import React from 'react';
import './JobCard.css'; // We will create this CSS file next

const JobCard = ({ job, isBookmarked, onBookmark }) => {
  // Format salary for better readability
  const formattedSalary = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(job.salary);

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <button onClick={onBookmark} className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}>
          {isBookmarked ? '★' : '☆'}
        </button>
      </div>
      <p className="company-name">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <div className="job-card-footer">
        <span className="job-salary">{formattedSalary}/yr</span>
        <span className="job-posted-date">{job.postedDate}</span>
      </div>
    </div>
  );
};

export default JobCard;