import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { MiniDivider } from './MiniDivider';
import { colSecondary, colPrimary } from '../../helpers/colors';

const useStyles = makeStyles({
  paperHeader: {
    fontFamily: 'Quicksand',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export const IconHeader = ({ icon, text, subheader }) => {
  const classes = useStyles();
  const color = subheader ? colPrimary : colSecondary;
  const iconSize = subheader ? 30 : 40;
  const Icon = icon;
  return (
    <div className={classes.paper}>
      <Grid container direction='row' alignItems='center' justify='center'>
        <Grid item>
          <Icon
            fontSize='large'
            style={{
              height: iconSize,
              width: iconSize,
              color: color,
              paddingRight: '10px',
            }}
          />
        </Grid>
        <Grid item>
          <Typography
            variant={subheader ? 'h5' : 'h4'}
            className={classes.paperHeader}
          >
            {text}
          </Typography>
        </Grid>
      </Grid>
      <MiniDivider color={subheader ? colPrimary : colSecondary} />
    </div>
  );
};
