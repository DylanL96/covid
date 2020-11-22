import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const LinearGradient = props => {
  const { data } = props;
  const boxStyle = {
    width: 180,
    margin: 'auto'
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
    height: 20
  };
  return (
    <div>
      <ScaleStyle style={boxStyle} className="display-flex">
        <span>{data.min}</span>
        <ScaleSpanStyle>{data.max}</ScaleSpanStyle>
      </ScaleStyle>
      <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.object.isRequired
};

const ScaleStyle = styled.div`
  display: flex;
`;

const ScaleSpanStyle = styled.span`
  margin-left: auto;
`

export default LinearGradient;