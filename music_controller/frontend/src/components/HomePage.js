import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { Button } from '@mui/material';
import GraphOptions from './GraphOptions';
import SearchTicker from './SearchTicker';
import Graph from './Graph';

export default function HomePage() {

    return(
        <div>
            <Router>
                <Button to='/' component={ Link } variant='contained'>Home</Button>
                <Routes>
                    <Route exact path='/' element={ <SearchTicker /> } />
                    <Route path='/ticker-results/:tickerSymbol'  element={ <GraphOptions /> } />
                    <Route path='/graph' element={ <Graph /> } />
                </Routes>
            </Router>
        </div>
    );
    
}
