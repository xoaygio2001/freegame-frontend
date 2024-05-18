import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/fontawesome-v5/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware  } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import {thunk} from "redux-thunk" 

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const reduxStore = createStore(rootReducer, applyMiddleware(thunk))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
