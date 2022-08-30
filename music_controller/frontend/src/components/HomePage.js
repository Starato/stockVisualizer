import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import GraphOptions from './GraphOptions';
import SearchTicker from './SearchTicker';
// import TickerResult from './TickerResult';

export default function HomePage() {

    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path='/home' element={ <SearchTicker /> } />
                    <Route path='/ticker-results/:tickerSymbol'  element={ <GraphOptions /> } />
                </Routes>
            </Router>
        </div>
    );
    
}
