import axios from 'axios';

export const addToFavourites = (gif) => async (dispatch) => {
  try {
    await axios.put('/api/users/save-gif', { gif });
  } catch (err) {}
};
