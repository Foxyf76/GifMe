import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getImages, searchImages } from '../../actions/home';
import { Grid as GiphyGrid } from '@giphy/react-components';
import ResizeObserver from 'react-resize-observer';
import { Grid, InputBase, makeStyles, Paper } from '@material-ui/core';
import { colSecondary, colPrimary } from '../../helpers/colors';
import { SearchOutlined } from '@material-ui/icons';
import { Search } from './Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    height: '40px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Home = ({ getImages, searchImages, setAlert }) => {
  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);
  const [query, setQuery] = useState('');
  const [displaySearch, setDisplaySearch] = useState(false);

  useEffect(() => {
    if (query === '') {
      setDisplaySearch(false);
    }
  }, [query]);

  const handleSearch = () => {
    return searchImages(query);
  };

  return (
    <Grid container alignItems='center' justify='center' alignContent='center'>
      <Grid item style={{ width: '70%' }}>
        <Paper
          style={{
            backgroundColor: colSecondary,
            padding: '10px',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <Paper className={classes.root}>
            <SearchOutlined fontSize='large' />
            <InputBase
              className={classes.input}
              onInput={(e) => {
                if (!e.target.value !== query) {
                  setDisplaySearch(false);
                  setQuery(e.target.value);
                }
              }}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  setDisplaySearch(true);
                }
              }}
            />
          </Paper>
        </Paper>

        {displaySearch ? (
          <Search searchQuery={handleSearch} width={width} />
        ) : (
          <GiphyGrid
            width={width}
            fetchGifs={getImages}
            columns={4}
            gutter={6}
          />
        )}

        <ResizeObserver
          onResize={({ width }) => {
            setWidth(width);
          }}
        />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  setAlert: PropTypes.func.isRequired,
  searchImages: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, getImages, searchImages })(Home);
