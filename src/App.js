import React, { useState } from 'react';
import JobList from './components/JobList';
import SearchBar from './components/SearchBar';
import BookmarksPage from './components/BookmarksPage';
import './App.css';

function App() {
  // Use basic React state to switch between pages
  const [showBookmarks, setShowBookmarks] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Board Feed</h1>
        <nav>
          <button onClick={() => setShowBookmarks(false)}>All Jobs</button>
          <button onClick={() => setShowBookmarks(true)}>Bookmarks</button>
        </nav>
      </header>
      <main>
        {showBookmarks ? (
          <BookmarksPage />
        ) : (
          <>
            <SearchBar />
            <JobList />
          </>
        )}
      </main>
    </div>
  );
}

export default App;