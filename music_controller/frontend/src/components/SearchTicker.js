import React, { useState, useEffect } from 'react';
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
    const [tickerResults, setTickerResults] = useState(null);

    useEffect(() => {
        document.title = ticker;
    });
    
    function updateTicker(e) {
        const value = e.target.value;

        setTicker(value.toUpperCase());
        setError(false);
    }

    function handleSearchAutocomplete() {

        if(ticker.trim() == "") { return setError(true); }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ticker: ticker.trim()
            }),
        };
    
        fetch('/api/stock', requestOptions)
            .then((response) => response.json())
            .then((data) => setTickerResults(data))
            .then(setTicker(''));
        
    }

    function enterSubmit(e) {
        if(e.key === 'Enter') {
            handleSearchAutocomplete();
            e.preventDefault();
        }
    }

    return (
        <div id='ticker-search-container'>
            <Grid
                xs={12}
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center">
                <Typography align="center" component='h3' variant='h3'>Stock Data Visualizer</Typography>
                <FormControl>
                    <TextField
                        sx={{width: "300px"}}
                        autoFocus
                        required={ true }
                        error = { error }
                        helperText = { error == true ? "Empty Field!" : "" }
                        label = 'Ticker Symbol'
                        variant = 'outlined'
                        value = { ticker }
                        placeholder = 'IBM, Best buy'
                        onChange = { updateTicker } 
                        onKeyDown={ enterSubmit }
                    />
                </FormControl>

                <Button
                    sx={{width: "300px"}}
                    size ='large' 
                    variant ='contained'
                    disabled = { error }
                    onClick = { handleSearchAutocomplete } >
                GO
                </Button>  
                <Typography class='centerResultsContainer' align="center">
                    {tickerResults && <TickerResult tickers={tickerResults} />}
                </Typography>
            </Grid>
        </div>
    );    
}
