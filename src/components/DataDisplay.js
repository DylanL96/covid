import React, {useEffect, useState, useMemo,} from 'react';
import axios from 'axios';
import Table from './Table';
import SpecificData from './SpecificData';
import {Link, BrowserRouter, Route} from 'react-router-dom';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const countriesURL = `https://corona.lmao.ninja/v3/covid-19/countries`;
  
  //Getting the date
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  //Fetching the data
  useEffect(() => {
    axios.get(countriesURL)
      .then(response => {
        setData(response.data)
        // console.log(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  },[countriesURL]);

  const columns = useMemo(() => [
    {
      Header: "Country",
      accessor: "country",
      Cell: ({ row }) => (<Link to={`/country/${row.id}`}>{row.values.country}</Link>)
    },
    {
      Header: "Cases",
      accessor: "cases",
    },
    {
      Header: "Todays Cases",
      accessor: "todayCases",
    },
    {
      Header: "Active Cases",
      accessor: "active",
    },
    {
      Header: "Total Deaths",
      accessor: "deaths",
    },
    {
      Header: "Todays Deaths",
      accessor: "todayDeaths",
    },
  ]);

  // Rendering the table and data 
  return (
    <div>
      <h1>COVID-19 Statistics</h1>
      <p>Updated {date}</p>
      {loading && <p>Table Loading</p>}
      <BrowserRouter>
        <Table columns={columns} data={data} />
        <Route path="/country/:Id" component={(SpecificData)}/>
      </BrowserRouter>
    </div>
  )
};

export default DataDisplay;
