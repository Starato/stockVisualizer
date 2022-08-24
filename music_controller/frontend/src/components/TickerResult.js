import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function TickerResult() {

    const navigate = useNavigate();
    const { tickerSymbol } = useParams();

    return(
        <div>
            <p>{ tickerSymbol }</p>
            <p>This is Ticker Result Page</p>
            <Button to='/' component={ Link } >Home</Button>
        </div>
    );
    
}