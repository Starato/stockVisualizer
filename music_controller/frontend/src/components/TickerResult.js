import React from 'react';
// import { Link, useParams } from 'react-router-dom';
import { 
    List,
    ListItemText,
    ListItemButton,
} from '@mui/material';
export default function TickerResult(props) {

    const suggestedTickers = props.tickers['bestMatches'] ? props.tickers['bestMatches'] : "";
    const maxAPI = props.tickers['Note'] ? props.tickers['Note'] : "";

    return(
        <div>
            <p class='centerText'>Results</p>
            
            <List>
                {/* api returns suggestions */}
                { suggestedTickers.length > 0 && 
                    suggestedTickers.map((symbol) => (
                        <ListItemButton>
                            <ListItemText primary={ `${symbol['1. symbol']} : ${symbol['2. name']}` } />
                        </ListItemButton>
                    ))
                }

                {/* api does not return suggestions */}
                {
                    (suggestedTickers.length == 0 && maxAPI == "" ) && 
                    <ListItemButton>
                        <ListItemText primary="No Match Found" />
                    </ListItemButton>
                }

                {/* max free api calls reached */}
                {
                    maxAPI && 
                    <ListItemButton>
                        <ListItemText primary="Max free API calls reached. Please try again in a few minutes." />
                    </ListItemButton>
                }
            </List>
        </div>
    );

    //TODO:
    //Styling
    //Make these results clickable and redirect to a component with graph options
    
    
    
}