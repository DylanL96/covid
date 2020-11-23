import React, {useEffect, useState} from 'react';
import axios from 'axios';

const SpecificData = ({match}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const countryURL = `https://corona.lmao.ninja/v3/covid-19/countries/${match.params.id}`;
  console.log(match)


  return (
    <div>
      <p>hi</p>
    </div>
  )
};

export default SpecificData