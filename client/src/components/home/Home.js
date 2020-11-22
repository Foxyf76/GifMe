import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getImages } from '../../actions/home';
import Gallery from 'react-photo-gallery';

const Home = ({ getImages, setAlert }) => {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    async function retrieveTrending() {
      let trending = await getImages(offset);
      setImages(trending);
      images.forEach((image) => {
        console.log(image.src);
      });
    }

    retrieveTrending();
  }, []);

  return (
    <div>
      {images.length === 0 ? <h1>Loading</h1> : <Gallery photos={images} />}
    </div>
  );
};

Home.propTypes = {
  setAlert: PropTypes.func.isRequired,
  performSearch: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, getImages })(Home);
