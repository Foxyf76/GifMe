import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getImages } from '../../actions/home';
import { Grid as GiphyGrid } from '@giphy/react-components';
import ResizeObserver from 'react-resize-observer';
import { Grid } from '@material-ui/core';

const Home = ({ getImages, setAlert }) => {
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <Grid container alignItems='center' justify='center' alignContent='center'>
      <Grid item style={{ width: '70%' }}>
        <GiphyGrid width={width} fetchGifs={getImages} columns={4} gutter={6} />
        <ResizeObserver
          onResize={({ width }) => {
            setWidth(width);
          }}
        />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  setAlert: PropTypes.func.isRequired,
  performSearch: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, getImages })(Home);
