import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { IconHeader } from '../layout/IconHeader';
import { Image, Assignment, Person } from '@material-ui/icons';
import { MiniDivider } from '../layout/MiniDivider';
import { colPrimary, colSecondary } from '../../helpers/colors';

const useStyles = makeStyles((theme) => ({
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

  greyHeader: {
    fontSize: '14px',
    color: 'grey',
    fontFamily: 'Quicksand',
    paddingBottom: '10px',
  },
}));

const Gif = () => {
  const classes = useStyles();
  const locationData = useLocation();
  const { state } = locationData;

  const gifTitle = () => {
    return state.title.length > 35
      ? state.title.substring(0, 30) + '...'
      : state.title;
  };

  console.log(state);

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
              style={{
                maxWidth: '100%',
                maxHeight: '420px',
                borderRadius: '15px',
              }}
            />
            <MiniDivider color={colPrimary} />
            <Grid xs={8} sm={8}>
              <Button>Back</Button>
              <Button>Visit</Button>
              <Button>Favourite</Button>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={7} sm={5} style={{}}>
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

            <IconHeader icon={Person} text={'User Details'} subheader={true} />

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
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Gif;
