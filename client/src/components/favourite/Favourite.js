import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@material-ui/core';
import { IconHeader } from '../layout/IconHeader';
import { Favorite } from '@material-ui/icons';
import Gallery from 'react-grid-gallery';

const Favourite = ({ user }) => {
  let { favourites } = user;

  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      alignContent='center'
      direction='column'
    >
      <IconHeader icon={Favorite} text={'Favourites'} subheader={false} />
      <Grid item style={{ width: '80%' }}>
        <Paper>
          <Gallery images={favourites}></Gallery>
        </Paper>
      </Grid>
    </Grid>
  );
};

Favourite.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Favourite);
