import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

 class Footer extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
   
    const authLinks = (
      
      <List className="Footer__list">            
          
          <ListItem>            
            <Button component={Link} to="/list-of-type-exercise">
               List of Types Exercise
            </Button> 
          </ListItem>
          
          <ListItem>            
            <Button component={Link} to="/list-of-workouts/:time">
              List of Workouts
            </Button>
          </ListItem>

          <ListItem>            
            <Button component={Link} to="/list-of-training">
              List of Trainings
            </Button>
          </ListItem>
      </List>
    )
    return (
      <Grid container  direction="row" justify="space-between" className="Footer" > 
        <Grid item xs={8} className="Footer__list--wrap">
          { isAuthenticated? authLinks: null}
        </Grid> 
        <Grid item xs={4}  container direction="column" justify="center" alignItems="center"> 
            <Grid  item  xs={12} container direction="row" justify="center" alignItems="center">
              Copyright &copy; {new Date().getFullYear()} exercise 
            </Grid>         
                    
        </Grid>
      </Grid>
    )
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Footer);

