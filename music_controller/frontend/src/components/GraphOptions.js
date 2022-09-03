import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, createSearchParams } from 'react-router-dom';
import { 
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function GraphOptions() {

    //Doesn't seem like Alphavantage has today's stock data, so we start the calendar at yesterdays date.
    const today = new Date();
    const yesterday = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`)
    const navigate = useNavigate();
    //variables
    const { tickerSymbol } = useParams();
    const [chart, setChart] = useState("Line");
    const [timeSeries, setTimeSeries] = useState("Intraday");
    const [timeInterval, setTimeInterval] = useState("30min");
    const [startDate, setStartDate] = useState(yesterday);
    const [endDate, setEndDate] = useState(yesterday);
    //field conditions
    const [isTimeInterval, setIsTimeInterval] = useState(false);
    const [isIntraday, setIsIntraday] = useState(true);
    const [btnError, setBtnError] = useState(false);
    const [dtRangeError, setDtRangeError] = useState(false);
    const [todayError, setTodayError] = useState(false);
    //object for graph
    const params = {
        ticker: tickerSymbol,
        chart: chart,
        timeSeries: timeSeries,
        timeInterval: timeInterval,
        chartStartDate: startDate,
        chartEndDate: endDate
    };

    useEffect(() => {
        if(startDate >= today || endDate >= today) {
            setTodayError(true);
            setBtnError(true);
        }else if(startDate > endDate && isIntraday == false) {
            setDtRangeError(true);
            setBtnError(true);
        }else{
            setDtRangeError(false);
            setBtnError(false);
            setTodayError(false);
        }
        
    })

    function checkTimeInterval(e) {
        setTimeSeries(e.target.value);
        if(e.target.value !== "Intraday") {
            setIsTimeInterval(true);
            setTimeInterval('');
            setIsIntraday(false);
        }
        if(e.target.value === "Intraday") {
            setIsTimeInterval(false);
            setIsIntraday(true);
        }
    }

    return (
        <div>
            <Button onClick={() => { navigate('/') }} >Back</Button>
            <p>Graph Options</p>
            <FormControl>
                <FormLabel>Chart Type</FormLabel>
                <RadioGroup
                    row
                    defaultValue="Line"
                    name="chart-type-radio"
                    onChange={ (e) => {setChart(e.target.value)} } >
                    <FormControlLabel value="Line" control={ <Radio /> } label="Line" />
                    <FormControlLabel value="Bar" control={ <Radio /> } label="Bar" />
                </RadioGroup>

                <FormLabel>Time Series</FormLabel>
                <RadioGroup
                    row
                    defaultValue="Intraday"
                    name="time-series-radio"
                    onChange={ checkTimeInterval } >
                    <FormControlLabel value="Intraday" control={ <Radio /> } label="Intraday" />
                    <FormControlLabel value="Daily" control={ <Radio /> } label="Daily" />
                    <FormControlLabel value="Weekly" control={ <Radio /> } label="Weekly" />
                    <FormControlLabel value="Monthly" control={ <Radio /> } label="Monthly" />
                </RadioGroup>
                
                <FormLabel disabled={isTimeInterval} >Time Interval</FormLabel>
                <RadioGroup
                    row
                    defaultValue="30min"
                    name="time-interval-radio"
                    onChange={ (e) => {setTimeInterval(e.target.value)} } >
                    <FormControlLabel disabled={isTimeInterval} value="30min" control={ <Radio /> } label="30 Minutes" />
                    <FormControlLabel disabled={isTimeInterval} value="60min" control={ <Radio /> } label="60 Minutes" />
                </RadioGroup>

                <Button
                    disabled={ btnError }
                    size='large'
                    variant='contained'
                    onClick={ () => navigate({
                        pathname: '/graph',
                        search: `?${createSearchParams(params)}`
                    })} >
                GO
                </Button>
                { dtRangeError && <p>End date cannot be before start date!</p> }
                { todayError && <p>Due to the way data is collected, we do not have todays data.</p> }
            </FormControl>
            
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                    required={ true }
                    label="Start Date"
                    inputFormat="YYYY-MM-DD"
                    value={ startDate }
                    onChange={(newStartDate) => {
                        setStartDate(newStartDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

                <DatePicker 
                    disabled={isIntraday}
                    required={ true }
                    label="End Date"
                    inputFormat="YYYY-MM-DD"
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
