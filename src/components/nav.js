import React from 'react'
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';






const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    color: 'white',
   
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link:{
    color: 'white',
    textDecoration: 'none',

  },
};

function Nav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" className={classes.link}>
            Immage App
            </Link>
          </Typography>

          <Link to="/history" className={classes.link}>
            <Button color="inherit" >Show history</Button>
          </Link>
                         
                     
        </Toolbar>




      </AppBar>
    </div>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);