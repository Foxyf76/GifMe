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

  if (state === undefined) {
    return <Redirect to='/' />;
  }

  const handleFavouriteClick = () => {
    addToFavourites(state);
  };

  const gifTitle = () => {
    return state.title.length > 35
      ? state.title.substring(0, 30) + '...'
      : state.title;
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
        <Grid item xs={5} sm={7}>
          <Paper className={classes.paper}>
            <img
              src={state.images.original.url}
              alt={'gif'}
              className={classes.gif}
            />
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
                  href={state.bitly_url}
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

        <Grid item xs={7} sm={5}>
          <Paper className={classes.paper}>
            <IconHeader
              icon={Assignment}
              text={'Image Details'}
              subheader={true}
            />

            <Typography className={classes.greyHeader}>Uploaded At:</Typography>
            <Typography>{state.import_datetime}</Typography>

            <Typography className={classes.greyHeader}>
              Trending Since:
            </Typography>
            <Typography>{state.trending_datetime}</Typography>

            <Typography className={classes.greyHeader}>Image Size:</Typography>
            <Typography>
              {(state.images.original.size / 1000000).toFixed(2)} MB
            </Typography>

            <hr />

            {state.user !== undefined ? (
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
                    src={state.user.avatar_url}
                    height={100}
                    width={100}
                    alt='avatar'
                    style={{ borderRadius: '200px' }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant={'h6'}>
                    {state.user.display_name}
                  </Typography>
                  <a
                    href={state.user.profile_url}
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
