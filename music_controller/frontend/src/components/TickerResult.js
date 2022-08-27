import React from 'react';
// import { Link, useParams } from 'react-router-dom';
import { 
    Grid,
    ListItemText,
    ListItemButton,
} from '@mui/material';
export default function TickerResult(props) {

    // const error = "I'm using the free Alphavantage API, you have exceeded the max free API calls. Please try again in a few minutes.";
    const suggestedTickers = props.tickers['bestMatches'];
    // const noResult = props.tickers['bestMatches'].lengt > 0 ? "" : "No Match Found";

    return(
        <div>
            {/* <Button to='/' component={ Link } >Home</Button> */}
            <p>Results</p>
            <Grid>{suggestedTickers.map((symbol) => (
                    <ListItemButton>
                        <ListItemText primary={`${symbol['1. symbol']} : ${symbol['2. name']}`} />
                    </ListItemButton>
                    ))}
            </Grid>
            <p>{ noResult }</p>
        </div>
        
    );

    //TODO:
    //Make these results clickable and redirect to a component with graph options
    //Fix No Match Found, currently shows at all times
    //Fix max api error message
    
    
}