import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import NavBar from './components/nav_bar';
import Calc from './components/calc_time';
import Compare from './components/compare_times';

const App = () => {
    return (
        <div>
            <NavBar />
            <Calc />
            <Compare />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));
