import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled, {createGlobalStyle} from 'styled-components';
import DataDisplay from './components/DataDisplay';
import { BrowserRouter, Route} from 'react-router-dom';
import SpecificData from './components/SpecificData';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [allData, setAllData] = useState([]);
  const allURL = `https://corona.lmao.ninja/v3/covid-19/all`;
  
  useEffect(() => {
    axios.get(allURL)
      .then(response => {
        // console.log(response.data);
        setAllData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },[allURL])

  return (
    <React.Fragment>
      <Title>
        <p>There are a total of <Data>{allData.cases}</Data> COVID-19 cases around the world. In total, <Data>{allData.deaths}</Data> people have died from COVID-19.</p>
      </Title>
      <BrowserRouter>
      <GlobalStyle/>
        <Route exact path="/" component={DataDisplay}/>
        <Route exact path="/:id" component={SpecificData}/>
      </BrowserRouter>
    </React.Fragment>
  )
};

const Title = styled.div`
  text-align:center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
`;

const Data = styled.span`
  color: red;
`;

const GlobalStyle = createGlobalStyle`
  body{
    background-color: RGB(223, 207, 190)
  }
`

export default App;
