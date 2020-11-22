import axios from 'axios';
import { setAlert } from './alert';

/**
 * Pull trending images from Giphy User
 * @param {integer} offset - Starting position for pulling images
 */

export const getImages = (offset) => async (dispatch) => {
  try {
    console.log(offset);
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
