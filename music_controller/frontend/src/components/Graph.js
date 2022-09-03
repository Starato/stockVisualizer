import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Box,
  Grid,
  Button
} from '@mui/material';

export default function Graph() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const ticker = searchParams.get('ticker');
  const chartType = searchParams.get('chart');
  const timeSeries = searchParams.get('timeSeries');
  const timeInterval = searchParams.get('timeInterval');
  const startDate = new Date(searchParams.get('chartStartDate'));
  const endDate = new Date(searchParams.get('chartEndDate'));

  const [graph, setGraph] = useState('');
  const parsedStartDate = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
  const parsedEndDate = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;

  useEffect(() => {
    handleGraphOptions();
  }, [])

  function handleGraphOptions() {

      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              ticker: ticker,
              chartType: chartType,
              timeSeries: timeSeries,
              timeInterval: timeInterval,
              startDate: parsedStartDate,
              endDate: parsedEndDate
          })
      }
      fetch('api/graph', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setGraph(data);
        });
  }

  return (
    <Grid
    item
    container
    justifyContent="center"
    >
      <Button onClick={ () => { navigate(`/ticker-results/${ticker}`) }} >Back</Button>

      <Box sx={{width: '100%', height: '100%%'}}>
        <div>
          <embed type='image/svg+xml' src={ graph } />
        </div>
      </Box>
    </Grid>
  )
}
