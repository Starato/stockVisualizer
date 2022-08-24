import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FormControl,
    Grid,
    Button,
    TextField,
    Typography
} from '@mui/material';
 
export default function BodyPage() {

    const [ticker, setTicker] = useState('');
    const [error, setError] = useState(false);
    const [btnError, setBtnError] = useState(false);

    // function handleSearchAutocomplete(e) {

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             ticker: ticker
    //         }),
    //     };
    
    //     if(ticker != ""){
    //         fetch('/api/stock', requestOptions)
    //             .then((response) => response.json())
    //             .then((data) => console.log(data));
    //     }
    //     if(this.state.ticker == ""){
    //         console.log(ticker);
    //         console.log(error);
    
    //     }
    // }
    
    function updateTicker(e) {

        setTicker(e.target.value);
        if(e.target.value == ""){ 
            setError(true);
            setBtnError(true)
        }
        if(e.target.value != ""){
            setError(false);
            setBtnError(false);
        }

    }

    return (
        <Grid item xs={12}>
            <Typography component='h3' variant='h3'>Stock Data Visualizer</Typography>
            <FormControl>
                <TextField required={ true }
                    error={ error }
                    helperText={ error == true ? "Empty Field!" : "" }
                    label='Ticker Symbol'
                    variant='outlined'
                    autoFocus
                    placeholder='IBM, Gamestop'
                    onChange={ updateTicker }/>
            </FormControl>
            <Button size='large' 
                variant='contained' 
                disabled={ btnError }
                to={{
                    pathname: `/ticker-results/${ticker}`,
            
                }} 
                component={ Link } 
            >
            GO
            </Button>
        </Grid>
    );

    
    
}
