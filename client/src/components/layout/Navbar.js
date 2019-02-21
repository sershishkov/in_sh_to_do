import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    background: '#5d6cf2',
    borderRadius: 3,
    border: 0,
    color: 'white',    
    '&:hover':{
      background: '#5cf3d2'
    }
  },
  activePage:{
    background: '#5cf3d2',
    borderRadius: 3,
    border: 0,
    color: 'white',    
    '&:hover':{
      background: '#5d6cf2'
    }
  }
};


 class Navbar extends Component {
   onLogoutClick(e){
     e.preventDefault();
     this.props.logoutUser();

   }
  
  render() {
    const { isAuthenticated } = this.props.auth;
    const displayPage = this.props.displayPage;
    const { classes } = this.props;   

    const guestLinks = ( 
      <List  component="nav" >
        <ListItem>
          <Button component={Link} to="/sign-up"             
            className= {displayPage === "register"?(classNames(classes.activePage)):(classNames(classes.root))}
            variant="contained">
            Sign UP
          </Button> 
        </ListItem>
        <ListItem>
          <Button component={Link}
           to="/sign-in"          
           className= {displayPage === "login"? classNames(classes.activePage):classNames(classes.root)}
            variant="contained">
            Sign IN
          </Button>
        </ListItem>
        {/* <ListItem>
          <Button 
          component={Link} 
          to="/verify-email"           
          className= {displayPage === "verifyEmail"? classNames(classes.activePage):classNames(classes.root)}
           variant="contained">
            Verify Email
          </Button>
        </ListItem>          */}
      </List>
    );
    const authLinks = (
      <List  component="nav"> 
        <ListItem>
          <ListItemText >
            FIT TRAINER
          </ListItemText>
        </ListItem> 

        <Divider />

        <ListItem>
          <Button 
          component={Link} 
          to="/dashboard" 
          className= {displayPage === "dashboard"? classNames(classes.activePage):classNames(classes.root)} 
          variant="contained">
            <i className="material-icons">dashboard</i>{' '}Dashboard
          </Button>
        </ListItem> 
        
        
      

          <ListItem>
            <Button 
            component={Link} 
            to="/list-of-type-exercise" 
            className= {displayPage === "ListOfTypeExercises"? classNames(classes.activePage):classNames(classes.root)} 
            variant="contained">
            <i className="material-icons">reorder</i>{' '} List of Types Exercise
            </Button>
          </ListItem>

          {/* <ListItem>
            <Button 
            component={Link} 
            to="/dashboard" 
            className= {displayPage === "EditTypeExercise"? classNames(classes.activePage):classNames(classes.root)}      
            variant="contained">
               <i className="material-icons">reorder</i>{' '}Edit Types Exercise
            </Button>
          </ListItem> */}

        <ListItem>
          <Button 
          component={Link} 
          to="/new-type-exercise"
          className= {displayPage === "NewTypeExercise"? classNames(classes.activePage):classNames(classes.root)}  
          variant="contained">
           <i className="material-icons">reorder</i>{' '}New Types Exercise
          </Button>
        </ListItem>
          
          <ListItem>
            <Button 
            component={Link} 
            to={`/dashboard`} 
            className= {displayPage === "ListOfWorkouts"? classNames(classes.activePage):classNames(classes.root)}  
            variant="contained">
               <i className="material-icons">reorder</i>{' '}Create Training
            </Button>
          </ListItem> 

          <ListItem>
            <Button 
            component={Link} 
            to="/list-of-training"
            className= {displayPage === "ListOfTrainings"? classNames(classes.activePage):classNames(classes.root)} 
            variant="contained">
              <i className="material-icons">reorder</i>{' '}List of Trainings
            </Button>
          </ListItem>
          
          <ListItem>
            <Button 
            component={Link} 
            to="/"  
            onClick={this.onLogoutClick.bind(this)}
            className={classNames(classes.root)}
            variant="contained">
              Log out
            </Button>
          </ListItem>          
          
      </List>
    )
    return (
      <Grid container  direction="column" justify="flex-start" alignItems="center" className="Navbar">
      
      
      { isAuthenticated? authLinks:guestLinks}
        
      </Grid>
    )
  }
}

Navbar.propTypes = {
  logoutUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  displayPage:PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    displayPage:state.displayPage.displayPage
  }
}
export default withStyles(styles)(connect(mapStateToProps, { logoutUser }) (Navbar));
