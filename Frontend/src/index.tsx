import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/LayoutArea/Layout/Layout';
import { BrowserRouter } from "react-router-dom";
import interceptorsService from './Services/InterceptorsService';
import socketIoService from './Services/SocketIoService';
import productSocketIoService from './Services/ProductSocketIoService';

interceptorsService.createInterceptors();

socketIoService.connect();
productSocketIoService.connect();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();
