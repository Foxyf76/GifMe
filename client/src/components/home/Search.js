import { Grid as GiphyGrid } from '@giphy/react-components';
import { makeStyles } from '@material-ui/core';

// Needed due to the 'fetchGifs' props in Giphy's Grid component.
// This prop requires a promise for the input and trying to use
// one grid and swapping the 'fetchGifs' promise or using 2 grids
// with different promise inputs all in the 'Home' component was not working

const useStyles = makeStyles(() => ({
  grid: {
    '& img': {
      borderRadius: '15px',
    },
  },
}));

export const Search = ({ searchQuery, width, overlay, handleClick }) => {
  const classes = useStyles();
  const clickGif = (gif) => {
    handleClick(gif);
  };

  return (
    <GiphyGrid
      width={width}
      noLink={true}
      fetchGifs={searchQuery}
      columns={4}
      gutter={6}
      className={classes.grid}
      overlay={overlay}
      onGifClick={clickGif}
    />
  );
};
