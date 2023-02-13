import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { store } from './redux/reducers';
import { Provider } from 'react-redux';
import { AppProvider } from './context';
import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore(
  { reducer: reducers },
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);


