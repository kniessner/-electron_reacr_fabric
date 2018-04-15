import $ from 'jquery';
import ReactDom from 'react-dom';
import Routes from './config/routes';

import "./styles/main";

ReactDom.render(
    Routes,
    document.getElementById('root')
);
