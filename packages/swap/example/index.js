import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './global.css';


const appRoot = document.createElement('div');


appRoot.id = 'app';
document.body.appendChild(appRoot);
ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, appRoot);
