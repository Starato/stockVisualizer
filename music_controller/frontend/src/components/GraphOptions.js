import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function GraphOptions() {

    const { tickerSymbol } = useParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    //TODO:
    //Send all info to another component
    //use that info to fetch stock data api 
    //open a new tab with pygal
    //final styling

    return (
        <div>
            <p>Graph Options</p>
            <p>{ tickerSymbol }</p>
            <FormControl>
                <FormLabel>Chart Type</FormLabel>
                <RadioGroup
                    row
                    defaultValue="Line"
                    name="chart-type-radio"
                >
                    <FormControlLabel value="Line" control={ <Radio /> } label="Line" />
                    <FormControlLabel value="Bar" control={ <Radio /> } label="Bar" />
                </RadioGroup>

                <FormLabel>Time Series</FormLabel>
                <RadioGroup
                    row
                    defaultValue="Intraday"
                    name="time-series-radio"
                >
                    <FormControlLabel value="Intraday" control={ <Radio /> } label="Intraday" />
                    <FormControlLabel value="Daily" control={ <Radio /> } label="Daily" />
                    <FormControlLabel value="Weekly" control={ <Radio /> } label="Weekly" />
                    <FormControlLabel value="Monthly" control={ <Radio /> } label="Monthly" />
                </RadioGroup>

                <FormLabel>Time Interval</FormLabel>
                <RadioGroup
                    row
                    defaultValue="1 Minute"
                    name="time-interval-radio"
                >
                    <FormControlLabel value="1 Minute" control={ <Radio /> } label="1 Minute" />
                    <FormControlLabel value="5 Minutes" control={ <Radio /> } label="5 Minutes" />
                    <FormControlLabel value="15 Minutes" control={ <Radio /> } label="15 Minutes" />
                    <FormControlLabel value="30 Minutes" control={ <Radio /> } label="30 Minutes" />
                    <FormControlLabel value="60 Minutes" control={ <Radio /> } label="60 Minutes" />
                </RadioGroup>

            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                    label="Start Date"
                    inputFormat="MM/DD/YYYY"
                    value={ startDate }
                    onChange={(newStartDate) => {
                        setStartDate(newStartDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

                <DatePicker 
                    label="End Date"
                    inputFormat="MM/DD/YYYY"
                    value={ endDate }
                    onChange={(newEndDate) => {
                        setEndDate(newEndDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    )
}
