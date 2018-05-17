import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';

import './index.css';
import configStore from './stores';
import routes from './routes';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

let store = configStore();


ReactDOM.render(
    <Provider store={store}>
        {/* <HashRouter>
            <Router routes={routes} ></Router>
        </HashRouter> */}
        <App/>
    </Provider>
    // <App/>
    , document.getElementById('root'));
registerServiceWorker();
