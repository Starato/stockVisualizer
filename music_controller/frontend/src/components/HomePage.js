import React from "react";
import TickerResult from './TickerResult';
import Body from './Body';
import Error from './Error';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default function HomePage() {

    return(
        <div>
        <Router>
            <Routes>
                <Route exact path='/' element={ <Body /> } />
                <Route path='/ticker-results/:tickerSymbol'  element={ <TickerResult /> } />
            </Routes>
        </Router>
        </div>
    );
    
}
