import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

 class Header extends Component {
    state={
      logOutDisplay:false
    }


  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();

  }
  avatarOnClick = () =>{
    const  click = ! this.state.logOutDisplay;
    this.setState({
      logOutDisplay:click
    })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;    

    const guestLinks = (
      <Grid container  direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={4}>
          {this.props.title}
        </Grid>
        <Grid item xs={2}>
          <Button component={Link} to="/sign-up">
            Sign UP
          </Button>          
        </Grid>
        <Grid item xs={2}>
          <Button component={Link} to="/sign-in">
            Sign IN
          </Button>           
        </Grid>
      </Grid>
    );
    const authLinks = (

      <Grid container  direction="row" justify="space-between" alignItems="center">
        <Grid item xs={4}>
          {this.props.title}
        </Grid>

        <Grid item xs={4} container  direction="row" justify="space-between" alignItems="center">
          <Grid item xs={8}>
            {user.email}
          </Grid>
          <Grid item xs={2}>
            <i className="material-icons"              
                  onClick={this.onLogoutClick.bind(this)}               
                  style ={ this.state.logOutDisplay ? {display:"block", cursor:"pointer"}:{display:"none"}}
                  title="Log out"
            >assignment_return</i>            
          </Grid>
          <Grid item xs={2}>
            <Avatar 
            src="/src/components/img/default-avatar.jpg"
            title="Avatar"
            onClick={this.avatarOnClick}
            style ={{cursor:"pointer"}}
            />
          </Grid>     
          
        </Grid>

      </Grid>
      
    )
    return (
      <Grid>      
         { isAuthenticated? authLinks:guestLinks}
      </Grid>
    )
  }
}


Header.propTypes = {
  logoutUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}





export default connect(mapStateToProps,{ logoutUser })(Header);
