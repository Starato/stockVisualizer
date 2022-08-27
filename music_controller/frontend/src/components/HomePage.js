import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Button from '@mui/material/Button';
import SearchTicker from './SearchTicker';
// import TickerResult from './TickerResult';

export default function HomePage() {

    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path='/' element={ <SearchTicker /> } />
                    {/* <Route path='/ticker-results/:tickerSymbol'  element={ <TickerResult /> } /> */}
                </Routes>
            </Router>
        </div>
    );
    
}
