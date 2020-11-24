import axios from 'axios';
import { setAlert } from './alert';

/**
 * Pull trending images from Giphy User
 * @param {integer} offset - Starting position for pulling images
 */

export const getImages = (offset) => async (dispatch) => {
  try {
    const res = await axios.post('/api/images/get-trending', { offset });

    let data = res.data;
    return data;
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    } else {
      dispatch(setAlert(err.response.data.msg, 'error'));
    }
  }
};

export const searchImages = (query) => async (dispatch) => {
  try {
    const res = await axios.post('/api/images/search-images', { query });
    console.log('searching' + query);
    let data = res.data;

    if (localStorage.getItem('searches') === null) {
      let searches = [];
      searches[0] = query;
      localStorage.setItem('searches', JSON.stringify(searches));
    } else {
      let searches = JSON.parse(localStorage.getItem('searches'));
      searches.push(query);
      localStorage.setItem('searches', JSON.stringify(searches));
    }
    console.log(localStorage.getItem('searches'));

    return data;
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    } else {
      dispatch(setAlert(err.response.data.msg, 'error'));
    }
  }
};
