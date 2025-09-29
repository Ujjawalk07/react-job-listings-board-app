import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store'; // Import the store
import { Provider } from 'react-redux'; // Import the Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the App component with the Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);