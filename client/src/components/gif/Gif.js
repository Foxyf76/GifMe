import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { IconHeader } from '../layout/IconHeader';
import {
  Image,
  Assignment,
  Person,
  ArrowBackIos,
  Favorite,
  OpenInNew,
} from '@material-ui/icons';
import { MiniDivider } from '../layout/MiniDivider';
import { colPrimary, colSecondary } from '../../helpers/colors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToFavourites } from '../../actions/gif';

const useStyles = makeStyles(() => ({
  paper: {
    minHeight: '525px',
    borderRadius: '15px',
    paddingTop: '10px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    width: '125px',
    color: 'white',
    backgroundColor: colSecondary,
  },

  gif: {
    maxWidth: '100%',
    maxHeight: '420px',
    borderRadius: '15px',
  },

  greyHeader: {
    fontSize: '14px',
    color: 'grey',
    fontFamily: 'Quicksand',
  },
}));

const Gif = ({ addToFavourites }) => {
  const classes = useStyles();
  const locationData = useLocation();
  const { state } = locationData;

  const gif = state;

  if (state === undefined) {
    return <Redirect to='/' />;
  }

  const handleFavouriteClick = () => {
    addToFavourites(gif);
  };

  const gifTitle = () => {
    return gif.caption > 35
      ? gif.caption.substring(0, 30) + '...'
      : gif.caption;
  };

  return (
    <Grid
      container
      alignItems='center'
      alignContent='center'
      direction='column'
    >
      <IconHeader icon={Image} text={gifTitle()} subheader={false} />
      <Grid container style={{ width: '80%' }} spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Paper className={classes.paper}>
            <img src={gif.src} alt={'gif'} className={classes.gif} />
            <hr />
            <Grid container justify='center' spacing={3}>
              <Grid item>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <Button
                    variant='contained'
                    className={classes.actionButtons}
                    startIcon={<ArrowBackIos />}
                  >
                    Back
                  </Button>
                </Link>
              </Grid>

              <Grid item>
                <a
                  href={gif.hyperlink}
                  style={{ textDecoration: 'none' }}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button
                    variant='contained'
                    className={classes.actionButtons}
                    startIcon={<OpenInNew />}
                  >
                    Visit
                  </Button>
                </a>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  className={classes.actionButtons}
                  startIcon={<Favorite />}
                  onClick={() => handleFavouriteClick()}
                >
                  Favourite
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Paper className={classes.paper}>
            <IconHeader
              icon={Assignment}
              text={'Image Details'}
              subheader={true}
            />

            <Typography className={classes.greyHeader}>Uploaded At:</Typography>
            <Typography>{gif.importTime}</Typography>

            <Typography className={classes.greyHeader}>
              Trending Since:
            </Typography>
            <Typography>{gif.trendingTime}</Typography>

            <Typography className={classes.greyHeader}>Image Size:</Typography>
            <Typography>{(gif.size / 1000000).toFixed(2)} MB</Typography>

            <hr />

            {state.userName ? (
              <Grid
                container
                justify='center'
                alignItems='center'
                alignContent='center'
                style={{ width: '70%', minHeight: '280px' }}
              >
                <IconHeader
                  icon={Person}
                  text={'User Details'}
                  subheader={true}
                />
                <Grid item xs={12} sm={6}>
                  <img
                    src={gif.userAvatar}
                    height={100}
                    width={100}
                    alt='avatar'
                    style={{ borderRadius: '200px' }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant={'h6'}>{gif.userName}</Typography>
                  <a
                    href={gif.userLink}
                    style={{ textDecoration: 'none' }}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Button style={{ color: colSecondary }}>
                      View Profile
                    </Button>
                  </a>
                </Grid>
              </Grid>
            ) : (
              <div>
                <MiniDivider color={colPrimary} />
                <Typography
                  variant='h4'
                  style={{ height: '250px', fontFamily: 'Quicksand' }}
                >
                  Uh oh!
                  <br /> No User Data Found!
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

Gif.propTypes = {
  addToFavourites: PropTypes.func.isRequired,
};

export default connect(null, { addToFavourites })(Gif);
