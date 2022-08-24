import React, { Component } from 'react';
import { render } from 'react-dom';
import HomePage from './HomePage';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <div id='app' >
            <div id='homePageContainer'>
                <HomePage />
            </div>
        </div>)
    }
}

const appDiv = document.getElementById("main");
render(<App />, appDiv);