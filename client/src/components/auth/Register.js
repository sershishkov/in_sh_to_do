import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyEmailUser } from '../../actions/authActions';
import { setVisiblePage } from '../../actions/displayPageActions';

import TitleOfPage from '../titleOfPage/TitleOfPage';

import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    background: '#da5cf3',
    borderRadius: 3,
    border: 0,
    color: 'white',    
    '&:hover':{
      background: '#5cf3d2'
    }
  },
  this_errors:{
    color:'red',
    fontSize:'10px'
  }
};


 class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    this.props.setVisiblePage("register");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.verifyEmailUser(newUser, this.props.history);
  }



  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
        <Grid className="Page" container direction="column" justify="flex-start">
          <Grid className="Header-wrap">
            <Header title="Sign Up"/>
          </Grid>

          <Grid className="Card-wrap" container direction="column" justify="flex-start">
            <Card className="Card">
            <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
              <TitleOfPage 
              title="Register with Fit Trainer App"
              description="Please enter your Name,email and password" /> 
            </Grid>
            <Grid  className="Card-body FormControl-wrap">
              <FormControl className="FormControl">
                <Grid>
                <TextField                      
                    label="Name"
                    className="TextField"                   
                    type="text" 
                    name="name" 
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onChange}
                    
                  /> 
                  {errors.name ? <Typography className={classNames(classes.this_errors)}>{errors.name}</Typography>:null}                 
                </Grid>
                <Grid>
                <TextField                      
                    label="Email"
                    className="TextField"                   
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    
                  /> 
                  {errors.email ? <Typography className={classNames(classes.this_errors)}>{errors.email}</Typography>:null}                  
                </Grid>
                <Grid>
                <TextField                      
                    label="Password"
                    className="TextField"                   
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    
                  /> 
                  {errors.password ? <Typography className={classNames(classes.this_errors)}>{errors.password}</Typography>:null}                  
                </Grid>
                <Grid>
                <TextField                      
                    label="Confirm password"
                    className="TextField"                  
                    type="password" 
                    name="password2" 
                    placeholder="Password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    
                  /> 
                  {errors.password2 ? <Typography className={classNames(classes.this_errors)}>{errors.password2}</Typography>:null}                 
                </Grid>
                <Button onClick={this.onSubmit}  className={classNames(classes.root)}>SIGN UP</Button>
                <Typography>Already have an account? 
                  <Button component={Link} to="/sign-in">
                    Sign IN
                  </Button> 
                </Typography>
              </FormControl>

               </Grid>
            </Card>
          </Grid>
        </Grid>     
    )
  }
}

Register.propTypes = { 
  verifyEmailUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  displayPage:state.displayPage.displayPage
});

export default withStyles(styles)(connect(mapStateToProps, {  verifyEmailUser, setVisiblePage })(withRouter(Register)));





