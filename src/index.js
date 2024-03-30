import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxStore from './store/ReduxStore';
import 'bulma/css/bulma.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ReduxStore}>
      <BrowserRouter >
    <App />
  </BrowserRouter>
  </Provider>

);

