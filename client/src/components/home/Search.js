import { Grid as GiphyGrid } from '@giphy/react-components';
import { useState } from 'react';
import { searchImages } from '../../actions/home';

export const Search = ({ searchQuery }) => {
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <GiphyGrid width={width} fetchGifs={searchQuery} columns={4} gutter={6} />
  );
};
