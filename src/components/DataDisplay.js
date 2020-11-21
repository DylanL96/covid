import React, {useEffect, useState} from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const countriesURL = `https://corona.lmao.ninja/v3/covid-19/countries`;

  useEffect(() => {
    axios.get(countriesURL)
      .then(response => {
        setData(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },[])

  return (
    <div>
      <h1>COVID-19 Statistics</h1>
      {data.map(d=><p key={d.country}>{d.country} <img src={d.countryInfo.flag}/></p>)}
    </div>
  )
};

export default DataDisplay;