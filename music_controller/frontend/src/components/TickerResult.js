import React from 'react';
import { 
    List,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TickerResult(props) {

    const suggestedTickers = props.tickers['bestMatches'] ? props.tickers['bestMatches'] : "";
    const maxAPI = props.tickers['Note'] ? props.tickers['Note'] : "";

    let navigate = useNavigate();

    return(
        <div>
            <p class='centerText'>Results</p>
            
            <List>
                {/* api returns suggestions */}
                { suggestedTickers.length > 0 && 
                    suggestedTickers.map((symbol) => (
                        <ListItemButton 
                            onClick={() => {
                                navigate(`/ticker-results/${symbol['1. symbol']}`)
                            }}>
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
    
    
    
}