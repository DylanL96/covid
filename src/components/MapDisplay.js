import React, {useState, useEffect} from 'react';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";
import styled from 'styled-components';
import {scaleLinear} from 'd3-scale';
import axios from 'axios';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-10m.json";

const colorScale = scaleLinear()
.domain([0.29, 0.68])
.range(["#ffedea", "#ff5233"]);


const MapDisplay = () => {
  const [data, setData] = useState([]);
  const countriesURL = `https://corona.lmao.ninja/v3/covid-19/countries`;

  useEffect(() => {
    axios.get(countriesURL)
      .then(data => {
        setData(data)
        // console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapDisplay