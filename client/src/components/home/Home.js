import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Home = ({setAlert}) => {
    return <h1>Home</h1>
}

Home.propTypes = {
  setAlert: PropTypes.func.isRequired,
  performSearch: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Home);