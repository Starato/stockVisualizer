import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import GraphOptions from './GraphOptions';
import SearchTicker from './SearchTicker';
import Graph from './Graph';
// import TickerResult from './TickerResult';

export default function HomePage() {

    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path='/home' element={ <SearchTicker /> } />
                    <Route path='/ticker-results/:tickerSymbol'  element={ <GraphOptions /> } />
                    <Route path='/graph' element={ <Graph /> } />
                </Routes>
            </Router>
        </div>
    );
    
}
