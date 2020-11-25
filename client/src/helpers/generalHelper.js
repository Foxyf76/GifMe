export const constructGif = (rawGif) => {
  let gif = {
    id: rawGif.id,
    caption: rawGif.title,
    src: rawGif.images.original.url,
    importTime: rawGif.import_datetime,
    trendingTime: rawGif.trending_datetime,
    hyperlink: rawGif.bitly_url,
    size: rawGif.images.original.size,
  };

  if (rawGif.hasOwnProperty('user')) {
    gif.userAvatar = rawGif.user.avatar_url;
    gif.userName = rawGif.user.display_name;
    gif.userLink = rawGif.user.profile_url;
    gif.thumbnail = rawGif.images.downsized.url;
    gif.thumbnailWidth = rawGif.images.downsized_small.width;
    gif.thumbnailHeight = rawGif.images.downsized_small.height;
  }
  return gif;
};
