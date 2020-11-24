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
  };

  //Get the data and save it to the data variable.
  useEffect(() => {
    axios.get(countryURL)
      .then(response => {
        setData(response.data)
        // console.log(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  },[]);

  return (
    <React.Fragment>
      <button onClick={handleHistory}>Go Back</button>
      <StyledTitle>{data.country}</StyledTitle>
      {/* Checks if the array (data) is empty before rendering */}
      <StyledImgDiv>
      {data?.countryInfo?.flag && (<StyledImg src={data.countryInfo.flag} alt="flag"/>)}
      </StyledImgDiv>
      
      <StyledData>
        {loading && <p>Data is loading</p>}
        <p>Population <StyledDetails>{data.population}</StyledDetails></p>
        <p>Total Cases <StyledDetails>{data.cases}</StyledDetails></p>
        <p>Active Cases <StyledDetails>{data.active}</StyledDetails></p>
        <p>Active Per One Million <StyledDetails>{data.activePerOneMillion}</StyledDetails></p>
        <p>One Case Per Person <StyledDetails>{data.oneCasePerPeople}</StyledDetails></p>
        <p>Total Deaths <StyldDeathData>{data.deaths}</StyldDeathData></p>
        <p>Deaths Per One Million <StyldDeathData>{data.deathsPerOneMillion}</StyldDeathData></p>
        <p>One Death Per Person <StyldDeathData>{data.oneDeathPerPeople}</StyldDeathData></p>
        <p>One Death Per Person <StyldDeathData>{data.oneDeathPerPeople}</StyldDeathData></p>
      </StyledData>
      <StyledData>
        <p>Critical Cases <StyledDetails>{data.critical}</StyledDetails></p>
        <p>Critical Per One Million <StyledDetails>{data.criticalPerOneMillion}</StyledDetails></p>
        <p>Recovered <StyledDetails>{data.recovered}</StyledDetails></p>
        <p>Recovered Per One Million <StyledDetails>{data.recoveredPerOneMillion}</StyledDetails></p>
        <p>Tests <StyledDetails>{data.tests}</StyledDetails></p>
        <p>Tests Per One Million <StyledDetails>{data.testsPerOneMillion}</StyledDetails></p>
        <p>Todays Cases <StyledDetails>{data.todayCases}</StyledDetails></p>
        <p>Todays Deaths <StyldDeathData>{data.todayDeaths}</StyldDeathData></p>
        <p>Todays Recovered <StyledDetails>{data.todayRecovered}</StyledDetails></p>
      </StyledData>
    </React.Fragment>
  )
};

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 50px;
  margin: 40px;
`;

const StyledData = styled.div`
  text-align:center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const StyldDeathData = styled.span`
  color: red;
  display: flex;
  justify-content: center;
`;

const StyledDetails = styled.span`
  color: green;
  display: flex;
  justify-content: center;
`;

const StyledImg = styled.img`
  margin-bottom: 10px;
  margin-top: 10px;
`;

//Centers the image in the div
const StyledImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SpecificData