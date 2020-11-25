/**
 * Extract relevant fields from Gif object
 * @param {object} rawGif - Gif object
 */

export const constructGif = (rawGif) => {
  let gif = {
    id: rawGif.id,
    caption: rawGif.title,
    src: rawGif.images.original.url,
    importTime: rawGif.import_datetime,
    trendingTime: rawGif.trending_datetime,
    hyperlink: rawGif.bitly_url,
    size: rawGif.images.original.size,
    thumbnail: rawGif.images.downsized.url,
    thumbnailWidth: rawGif.images.downsized_small.width,
    thumbnailHeight: rawGif.images.downsized_small.height,
  };

  if (rawGif.hasOwnProperty('user')) {
    gif.userAvatar = rawGif.user.avatar_url;
    gif.userName = rawGif.user.display_name;
    gif.userLink = rawGif.user.profile_url;
  }
  return gif;
};
