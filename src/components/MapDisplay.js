import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip'
import { ComposableMap, Geographies, Geography} from "react-simple-maps";
import {scaleQuantile} from 'd3-scale';
import LinearGradient from './LinearGradient.js';
import axios from 'axios';

const WORLD = require('./world.topo.json');

const PROJECTION_CONFIG = {
  scale: 50,
  center: [0,50] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

const getHeatMapData = () => {
  return [
    { id: 'AFG', state: 'Afghanistan', value: 44503  },
    { id: 'AGO', state: 'Angola', value: 14413 },
    { id: 'ALB', state: 'Albania', value: 32196 },
    { id: 'ARE', state: 'United Arab Emirates', value: 0 },
    { id: 'ARG', state: 'Argentina', value: 1359042 },
    { id: 'ARM', state: 'Armenia', value: 1931 },
    { id: 'ATA', state: 'Antarctica', value: 0 },
    { id: 'ATF', state: 'French Southern and Antarctic Lands', value: 0 },
    { id: 'AUS', state: 'Australia', value: 27806 },
    { id: 'AUT', state: 'Austria', value: 241962 },
    { id: 'AZE', state: 'Azerbaijan', value: 89898 },
    { id: 'BDI', state: 'Burundi', value: 656 },
    { id: 'BEL', state: 'Belgium', value: 556904 },
    { id: 'BEN', state: 'Benin', value: 2916},
    { id: 'BFA', state: 'Burkina Faso', value: 2703},
    { id: 'BGD', state: 'Bangladesh', value: 447341 },
    { id: 'BGR', state: 'Bulgaria', value:120697 },
    { id: 'BHS', state: 'The Bahamas', value: 7395 },
    { id: 'BIH', state: 'Bosnia and Herzegovina', value: 79309 },
    { id: 'BLR', state: 'Belarus', value: 123999},
    { id: 'BLZ', state: 'Belize', value: 5110},
    { id: 'BOL', state: 'Bolivia', value: 143922 },
    { id: 'BRA', state: 'Brazil', value: 6052786 },
    { id: 'BRN', state: 'Brunei', value: 148 },
    { id: 'BTN', state: 'Bhutan', value: 379 },
    { id: 'BWA', state: 'Botswana', value: 9594 },
    { id: 'CAF', state: 'Central African Republic', value: 4911 },
    { id: 'CAN', state: 'Canada', value: 325711 },
    { id: 'CHE', state: 'Switzerland', value: 290601 },
    { id: 'CHL', state: 'Chile', value: 539143 },
    { id: 'CHN', state: 'China', value: 86431 },
    { id: 'CIV', state: 'Ivory Coast', value: 0},
    { id: 'CMR', state: 'Cameroon', value: 23528 },
    { id: 'COD', state: 'Democratic Republic of the Congo', value: 5632 },
    { id: 'COG', state: 'Republic of the Congo', value: 5632 },
    { id: 'COL', state: 'Colombia', value: 1240493 },
    { id: 'CRI', state: 'Costa Rica', value: 129418},
    { id: 'CUB', state: 'Cuba', value: 7798},
    { id: '-99', state: 'Northern Cyprus', value: 0  },
    { id: 'CYP', state: 'Cyprus', value: 8456 },
    { id: 'CZE', state: 'Czech Republic', value:  490750},
    { id: 'DEU', state: 'Germany', value: 918711 },
    { id: 'DJI', state: 'Djibouti', value: 5661  },
    { id: 'DNK', state: 'Denmark', value: 70485 },
    { id: 'DOM', state: 'Dominican Republic', value: 137770 },
    { id: 'DZA', state: 'Algeria', value: 73774 },
    { id: 'ECU', state: 'Ecuador', value: 184876 },
    { id: 'EGY', state: 'Egypt', value: 112676 },
    { id: 'ERI', state: 'Eritrea', value: 551 },
    { id: 'ESP', state: 'Spain', value:  1589219},
    { id: 'EST', state: 'Estonia', value: 9724 },
    { id: 'ETH', state: 'Ethiopia', value: 105352 },
    { id: 'FIN', state: 'Finland', value: 21639 },
    { id: 'FJI', state: 'Fiji', value: 35 },
    { id: 'FLK', state: 'Falkland Islands', value: 16},
    { id: 'FRA', state: 'France', value: 2127051 },
    { id: 'GUF', state: 'French Guiana', value: 11014 },
    { id: 'GAB', state: 'Gabon', value: 9131},
    { id: 'GBR', state: 'United Kingdom', value: 1493383},
    { id: 'GEO', state: 'Georgia', value: 104732},
    { id: 'GHA', state: 'Ghana', value: 50874},
    { id: 'GIN', state: 'Guinea', value:12826 },
    { id: 'GMB', state: 'Gambia', value: 3726 },
    { id: 'GNB', state: 'Guinea Bissau', value: 2421 },
    { id: 'GNQ', state: 'Equatorial Guinea', value: 5130 },
    { id: 'GRC', state: 'Greece', value: 90121 },
    { id: 'GRL', state: 'Greenland', value: 18 },
    { id: 'GTM', state: 'Guatemala', value: 118417 },
    { id: 'GUY', state: 'Guyana', value: 5093},
    { id: 'HND', state: 'Honduras', value: 104435},
    { id: 'HRV', state: 'Croatia', value: 103718 },
    { id: 'HTI', state: 'Haiti', value: 9214 },
    { id: 'HUN', state: 'Hungary', value: 174618 },
    { id: 'IDN', state: 'Indonesia', value: 497668 },
    { id: 'IND', state: 'India', value: 9107622},
    { id: 'IRL', state: 'Ireland', value: 70143},
    { id: 'IRN', state: 'Iran', value: 854361 },
    { id: 'IRQ', state: 'Iraq', value: 535321 },
    { id: 'ISL', state: 'Iceland', value: 5277 },
    { id: 'ISR', state: 'Israel', value: 328613 },
    { id: 'ITA', state: 'Italy', value: 1380531 },
    { id: 'JAM', state: 'Jamaica', value: 10240},
    { id: 'JOR', state: 'Jordan', value: 178161},
    { id: 'JPN', state: 'Japan', value: 127665 },
    { id: 'KAZ', state: 'Kazakhstan', value: 125466},
    { id: 'KEN', state: 'Kenya', value: 76404 },
    { id: 'KGZ', state: 'Kyrgyzstan', value: 69581 },
    { id: 'KHM', state: 'Cambodia', value: 306},
    { id: 'KOR', state: 'South Korea', value: 30733},
    { id: '-99', state: 'Kosovo', value: 0},
    { id: 'KWT', state: 'Kuwait', value: 140056 },
    { id: 'LAO', state: 'Laos', value: 25},
    { id: 'LBN', state: 'Lebanon', value: 115283 },
    { id: 'LBR', state: 'Liberia', value: 1551},
    { id: 'LBY', state: 'Libya', value: 77823 },
    { id: 'LKA', state: 'Sri Lanka', value: 19946 },
    { id: 'LSO', state: 'Lesotho', value: 2085 },
    { id: 'LTU', state: 'Lithuania', value: 47047},
    { id: 'LUX', state: 'Luxembourg', value: 30333},
    { id: 'LVA', state: 'Latvia', value: 13120},
    { id: 'MAR', state: 'Morocco', value: 320962 },
    { id: 'MDA', state: 'Moldova', value: 96689 },
    { id: 'MDG', state: 'Madagascar', value: 17341 },
    { id: 'MEX', state: 'Mexico', value: 1032688},
    { id: 'MKD', state: 'Macedonia', value: 53631},
    { id: 'MLI', state: 'Mali', value: 4206 },
    { id: 'MMR', state: 'Myanmar', value: 79246  },
    { id: 'MNE', state: 'Montenegro', value: 30653 },
    { id: 'MNG', state: 'Mongolia', value: 629  },
    { id: 'MOZ', state: 'Mozambique', value: 14981 },
    { id: 'MRT', state: 'Mauritania', value: 8096  },
    { id: 'MWI', state: 'Malawi', value: 6003 },
    { id: 'MYS', state: 'Malaysia', value: 54775 },
    { id: 'NAM', state: 'Namibia', value: 13811 },
    { id: 'NCL', state: 'New Caledonia', value: 32 },
    { id: 'NER', state: 'Niger', value: 1351 },
    { id: 'NGA', state: 'Nigeria', value: 66228 },
    { id: 'NIC', state: 'Nicaragua', value: 5725 },
    { id: 'NLD', state: 'Netherlands', value:  484648},
    { id: 'NOR', state: 'Norway', value: 32352},
    { id: 'NPL', state: 'Nepal', value: 220308 },
    { id: 'NZL', state: 'New Zealand', value: 2028 },
    { id: 'OMN', state: 'Oman', value: 122081},
    { id: 'PAK', state: 'Pakistan', value: 374173 },
    { id: 'PAN', state: 'Panama', value: 153577 },
    { id: 'PER', state: 'Peru', value: 948081 },
    { id: 'PHL', state: 'Philippines', value: 418818 },
    { id: 'PNG', state: 'Papua New Guinea', value: 604 },
    { id: 'POL', state: 'Poland', value: 861331 },
    { id: 'PRI', state: 'Puerto Rico', value: 0 },
    { id: 'PRK', state: 'North Korea', value: 0 },
    { id: 'PRT', state: 'Portugal', value: 255970 },
    { id: 'PRY', state: 'Paraguay', value: 75857 },
    { id: 'QAT', state: 'Qatar', value: 137229 },
    { id: 'ROU', state: 'Romania', value: 418645 },
    { id: 'RUS', state: 'Russia', value: 2089329},
    { id: 'RWA', state: 'Rwanda', value: 5620},
    { id: 'ESH', state: 'Western Sahara', value: 10},
    { id: 'SAU', state: 'Saudi Arabia', value: 355258 },
    { id: 'SDN', state: 'Sudan', value: 15839 },
    { id: 'SSD', state: 'South Sudan', value: 3047 },
    { id: 'SEN', state: 'Senegal', value: 15882},
    { id: 'SLB', state: 'Solomon Islands', value: 16},
    { id: 'SLE', state: 'Sierra Leone', value: 2405},
    { id: 'SLV', state: 'El Salvador', value: 37562 },
    { id: '-99', state: 'Somaliland', value: 0},
    { id: 'SOM', state: 'Somalia', value: 4382},
    { id: 'SRB', state: 'Republic of Serbia', value: 121120 },
    { id: 'SUR', state: 'Suriname', value: 5295 },
    { id: 'SVK', state: 'Slovakia', value: 96241 },
    { id: 'SVN', state: 'Slovenia', value: 65308 },
    { id: 'SWE', state: 'Sweden', value: 208295 },
    { id: 'SWZ', state: 'Swaziland', value: 6205},
    { id: 'SYR', state: 'Syria', value: 7154},
    { id: 'TCD', state: 'Chad', value: 1633 },
    { id: 'TGO', state: 'Togo', value: 2829 },
    { id: 'THA', state: 'Thailand', value: 3913 },
    { id: 'TJK', state: 'Tajikistan', value: 11854 },
    { id: 'TKM', state: 'Turkmenistan', value: 0},
    { id: 'TLS', state: 'East Timor', value: 0 },
    { id: 'TTO', state: 'Trinidad and Tobago', value: 6324 },
    { id: 'TUN', state: 'Tunisia', value: 87471 },
    { id: 'TUR', state: 'Turkey', value: 440805 },
    { id: 'TWN', state: 'Taiwan', value: 617 },
    { id: 'TZA', state: 'United Republic of Tanzania', value: 509 },
    { id: 'UGA', state: 'Uganda', value: 17667 },
    { id: 'UKR', state: 'Ukraine', value: 624744},
    { id: 'URY', state: 'Uruguay', value: 4564 },
    { id: 'USA', state: 'United States of America', value: 12457447 },
    { id: 'UZB', state: 'Uzbekistan', value: 71552  },
    { id: 'VEN', state: 'Venezuela', value: 99435 },
    { id: 'VNM', state: 'Vietnam', value: 1307 },
    { id: 'VUT', state: 'Vanuatu', value: 1  },
    { id: 'PSE', state: 'West Bank', value: 0 },
    { id: 'YEM', state: 'Yemen', value: 2093 },
    { id: 'ZAF', state: 'South Africa', value: 765409 },
    { id: 'ZMB', state: 'Zambia', value: 17424 },
    { id: 'ZWE', state: 'Zimbabwe', value: 9172},
  ];
};

const MapDisplay = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  return (
    <div className="full-width-height container">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={500}
          height={220}
          data-tip=""
        >
          <Geographies geography={WORLD}>
            {({ geographies }) =>
              geographies.map(geo => {
                //console.log(geo.id);
                const current = data.find(s => s.id === geo.id);
                return (
                  
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <LinearGradient data={gradientData} />
    </div>
  );
};

export default MapDisplay