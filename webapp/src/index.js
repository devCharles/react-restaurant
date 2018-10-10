import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'bulma/css/bulma.css'

import * as serviceWorker from './serviceWorker';
import App from './App';

import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <App /> 
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
