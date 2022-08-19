import React, {StrictMode} from 'react';
import App from './App';
import axios from "axios";
import {createRoot} from 'react-dom/client';
axios.defaults.withCredentials = true;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

