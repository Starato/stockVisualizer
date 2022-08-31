import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { jsx } from '@emotion/react';

export default function Graph() {

  // function handleGraphOptions() {

  //     const requestOptions = {
  //         method: 'POST',
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify({
  //             null: null
  //         })
  //     }
  //     fetch('api/graph', requestOptions)
  //         .then((response) => response.json())
  //         .then((data) => console.log(data));
  // }

  const [searchParams] = useSearchParams();
  const ticker = searchParams.get('ticker');
  const chartType = searchParams.get('chart');
  const timeSeries = searchParams.get('timeSeries');
  const timeInterval = searchParams.get('timeInterval');
  const startDate = searchParams.get('chartStartDate');
  const endDate = searchParams.get('chartEndDate');

  return (
    <div>
      <p>graph</p>
      <p>{ ticker }</p>
      <p>{ chartType }</p>
      <p>{ timeSeries }</p>
      <p>{ timeInterval }</p>
      <p>{ startDate }</p>
      <p>{ endDate }</p>
    </div>
  )
}
