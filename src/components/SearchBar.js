import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, setSortBy } from '../redux/jobsSlice';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the setFilters action with the changed filter
    dispatch(setFilters({ [name]: value }));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        name="keyword"
        placeholder="Search by keyword or company"
        onChange={handleFilterChange}
        className="search-input"
      />
      <input
        type="text"
        name="company"
        placeholder="Filter by company"
        onChange={handleFilterChange}
        className="search-input"
      />
       <input
        type="text"
        name="location"
        placeholder="Filter by location"
        onChange={handleFilterChange}
        className="search-input"
      />
      <select onChange={handleSortChange} className="sort-select">
        <option value="newest">Sort by Newest</option>
        <option value="salary">Sort by Salary</option>
      </select>
    </div>
  );
};

export default SearchBar;