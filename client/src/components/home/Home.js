import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getImages, searchImages } from '../../actions/home';
import { Grid as GiphyGrid } from '@giphy/react-components';
import ResizeObserver from 'react-resize-observer';
import {
  Grid,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { colSecondary } from '../../helpers/colors';
import { SearchOutlined, TrendingUp } from '@material-ui/icons';
import { Search } from './Search';
import { useHistory } from 'react-router-dom';
import { IconHeader } from '../layout/IconHeader';
import { constructGif } from '../../helpers/generalHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '15px',
  },
  searchBar: {
    backgroundColor: colSecondary,
    borderRadius: '15px',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
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
  grid: {
    '& img': {
      borderRadius: '15px',
    },
  },
  overlay: {
    position: 'absolute',
    borderRadius: '15px',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
    },
  },
}));

const Home = ({ getImages, searchImages, setAlert }) => {
  const classes = useStyles();
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);
  const [query, setQuery] = useState('');
  const [displaySearch, setDisplaySearch] = useState(false);

  const GifOverlay = ({ isHovered, gif }) => {
    console.log(gif);
    let overlay = isHovered ? (
      <div className={classes.overlay}>
        <Typography style={{ fontFamily: 'Quicksand', fontSize: '20px' }}>
          View
        </Typography>
      </div>
    ) : (
      <div />
    );
    return overlay;
  };

  useEffect(() => {
    if (query === '') {
      setDisplaySearch(false);
    }
  }, [query]);

  const redirect = (gif) => {
    const gifData = constructGif(gif);

    history.push({
      pathname: `/gif/${gifData.id}`,
      state: gifData,
    });
  };

  return (
    <Grid container alignItems='center' justify='center' alignContent='center'>
      <Grid item style={{ width: '70%' }}>
        <Paper className={classes.searchBar}>
          <Paper className={classes.root}>
            <SearchOutlined fontSize='large' />
            <InputBase
              inputProps={{
                maxLength: 20,
              }}
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
          <IconHeader
            icon={SearchOutlined}
            subheader={false}
            text={`You Searched '${query}'`}
          />
        ) : (
          <IconHeader
            icon={TrendingUp}
            subheader={false}
            text={'Trending Gifs'}
          />
        )}

        <div
          style={{
            marginBottom: '50px',
          }}
        >
          {displaySearch ? (
            <Search
              searchQuery={() => searchImages(query)}
              width={width}
              overlay={GifOverlay}
              handleClick={redirect}
            />
          ) : (
            <GiphyGrid
              onGifClick={redirect}
              noLink={true}
              width={width}
              fetchGifs={getImages}
              overlay={GifOverlay}
              columns={4}
              gutter={6}
              className={classes.grid}
            />
          )}
        </div>

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
