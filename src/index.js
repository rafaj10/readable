import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import './index.css';
import './statics/css/default.css'
import './statics/css/fonts.css'
import './statics/css/layout.css'
import './statics/css/media-queries.css'
import store from './store/store';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
