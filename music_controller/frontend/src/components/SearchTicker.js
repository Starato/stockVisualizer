import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FormControl,
    Grid,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import TickerResult from './TickerResult';

 
export default function BodyPage() {

    const [ticker, setTicker] = useState('');
    const [error, setError] = useState(false);
    const [btnError, setBtnError] = useState(false);
    const [tickerResults, setTickerResults] = useState(null);

    useEffect(() => {
        document.title = ticker;
    });
    
    function updateTicker(e) {
        const value = e.target.value.trim();
        setTicker(value.toUpperCase());

        if(value == ""){ 
            setError(true);
            setBtnError(true)
        }
        if(value != ""){
            setError(false);
            setBtnError(false);
        }

    }

    function handleSearchAutocomplete() {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ticker: ticker
            }),
        };
    
        fetch('/api/stock', requestOptions)
            .then((response) => response.json())
            .then((data) => setTickerResults(data))
            .then(setTicker(''));
        
    }

    return (
        <Grid item xs={12}>
            <Typography component='h3' variant='h3'>Stock Data Visualizer</Typography>
            <FormControl>
                <TextField required={ true }
                    error = { error }
                    helperText = { error == true ? "Empty Field!" : "" }
                    label = 'Ticker Symbol'
                    variant = 'outlined'
                    autoFocus
                    value = { ticker }
                    placeholder = 'IBM, Gamestop'
                    onChange = { updateTicker }/>
            </FormControl>

            <Button size ='large' 
                variant ='contained' 
                disabled = { btnError }
                onClick = { handleSearchAutocomplete } >
            GO
            </Button>
            
            <Typography>
                {tickerResults && <TickerResult tickers={tickerResults} />}
            </Typography>
        </Grid>

    );

    //TODO:
    //Styling
    
    
}
