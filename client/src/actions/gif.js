import axios from 'axios';
import { setAlert } from './alert';

export const addToFavourites = (gif) => async (dispatch) => {
  try {
    await axios.put('/api/users/save-gif', { gif });
    dispatch(setAlert('Added to Favourites!', 'success'));
  } catch (err) {
    console.log(err);
  }
};
