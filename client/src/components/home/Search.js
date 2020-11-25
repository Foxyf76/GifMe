import { Grid as GiphyGrid } from '@giphy/react-components';

// Needed due to the 'fetchGifs' props in Giphy's Grid component.
// This prop requires a promise for the input and trying to use
// one grid and swapping the 'fetchGifs' promise or using 2 grids
// with different promise inputs all in the 'Home' component was not working

export const Search = ({ searchQuery, width, overlay, handleClick }) => {
  const clickGif = (gif) => {
    console.log('CLICKED');
    console.log(gif);
    handleClick(gif);
  };

  return (
    <GiphyGrid
      width={width}
      noLink={true}
      fetchGifs={searchQuery}
      columns={4}
      gutter={6}
      overlay={overlay}
      onGifClick={clickGif}
    />
  );
};
