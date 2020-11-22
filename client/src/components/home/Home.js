import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getImages } from '../../actions/home';
import { Grid } from '@giphy/react-components';
import ResizeObserver from 'react-resize-observer';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const Home = ({ getImages, setAlert, alertOnBottom }) => {
  const [images, setImages] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  const getGifs = async (offset) => {
    console.log(offset);
    await getImages(offset);
  };

  return (
    <div>
      <Grid width={width} fetchGifs={getImages} columns={3} gutter={6} />
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
    </div>
  );
};

Home.propTypes = {
  setAlert: PropTypes.func.isRequired,
  performSearch: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, getImages })(Home);
