import { Grid as GiphyGrid } from '@giphy/react-components';

export const Search = ({ searchQuery, width }) => {
  return (
    <GiphyGrid width={width} fetchGifs={searchQuery} columns={4} gutter={6} />
  );
};
