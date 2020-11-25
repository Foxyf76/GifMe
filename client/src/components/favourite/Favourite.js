import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import { IconHeader } from '../layout/IconHeader';
import { Favorite } from '@material-ui/icons';
import Gallery from 'react-grid-gallery';
import { colSecondary } from '../../helpers/colors';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  lightboxButton: {
    margin: '0 auto',
    color: 'white',
    backgroundColor: colSecondary,
    marginBottom: '10px',
  },
}));

const Favourite = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedGif, setSelectedGif] = useState({});

  let { favourites } = user;

  const handleGifSelect = (index) => {
    setSelectedGif(favourites[index]);
  };

  const redirect = () => {
    history.push({
      pathname: `/gif/${selectedGif.id}`,
      state: selectedGif,
    });
  };

  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      alignContent='center'
      direction='column'
    >
      <IconHeader icon={Favorite} text={'Favourites'} subheader={false} />
      <Grid item style={{ width: '70%' }}>
        <Paper>
          <Gallery
            images={favourites}
            lightboxWillOpen={handleGifSelect}
            customControls={[
              <Button
                variant='contained'
                className={classes.lightboxButton}
                onClick={redirect}
              >
                View in GifMe!
              </Button>,
            ]}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

Favourite.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Favourite);
