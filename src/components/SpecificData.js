import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SpecificData = ({match}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const countryURL = `https://corona.lmao.ninja/v3/covid-19/countries/${match.params.id}`;
  // console.log(match);

  //Go back to main screen. Gives us access to the history instance we can use to navigate.
  const history = useHistory();
  const handleHistory = () => {
    history.push('/');
  }

  //Get the data and save it to the data variable.
  useEffect(() => {
    axios.get(countryURL)
      .then(response => {
        setData(response.data)
        console.log(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  },[countryURL]);

  return (
    <React.Fragment>
      <button onClick={handleHistory}>Go Back</button>
      <StyledData>
        {loading && <p>Data is loading</p>}
        <p>{data.country}</p>
        <p>Population of: {data.population}</p>
        <p>Total Cases: {data.cases}</p>
        <p>Active Cases: {data.active}</p>
        <p>Active Per One Million {data.activePerOneMillion}</p>
        <p>One Case Per Person {data.oneCasePerPeople}</p>
        <p>Total Deaths: {data.deaths}</p>
        <p>Deaths Per One Million {data.deathsPerOneMillion}</p>
        <p>One Death Per Person {data.oneDeathPerPeople}</p>
      </StyledData>
    </React.Fragment>
  )
};

const StyledData = styled.div`
  text-align:center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
`;

export default SpecificData