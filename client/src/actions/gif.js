import axios from 'axios';
import { setAlert } from './alert';

/**
 * Add Gif to favourite
 * @param {object} gif - Gif object
 */

export const addToFavourites = (gif) => async (dispatch) => {
  try {
    await axios.put('/api/users/save-gif', { gif });
    dispatch(setAlert('Added to Favourites!', 'success'));
  } catch (err) {
    console.log(err);
    dispatch(setAlert('Error adding to Favourites!', 'warning'));
  }
};
