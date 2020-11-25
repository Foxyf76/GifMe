import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';

/**
 * Add Gif to favourite
 * @param {object} gif - Gif object
 */

export const addToFavourites = (gif) => async (dispatch) => {
  try {
    await axios.put('/api/users/save-gif', { gif });
    dispatch(setAlert('Added to Favourites!', 'success'));
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch(setAlert('Error adding to Favourites!', 'warning'));
  }
};
