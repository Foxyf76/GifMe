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
    // let { data } = res.data;

    // if (res.status === 200) {
    //   data.forEach((image) => {
    //     cleanedImages.push({
    //       id: image.id,
    //       src: image.images.downsized.url,
    //       height: image.images.downsized_small.height.charAt(0),
    //       width: image.images.downsized_small.width.charAt(0),
    //       user_avatar: image.user ? image.user.avatar_url : '',
    //       user_name: image.user ? image.user.display_name : '',
    //       user_url: image.user ? image.user.profile_url : '',
    //     });
    //   });

    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    } else {
      dispatch(setAlert(err.response.data.msg, 'error'));
    }
  }
};
