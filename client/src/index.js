import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PostProvider } from './context/postContext';
import { MessagesProvider } from './context/messagesContext';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <MessagesProvider>
        <PostProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PostProvider>
    </MessagesProvider>
  </React.StrictMode>
);

