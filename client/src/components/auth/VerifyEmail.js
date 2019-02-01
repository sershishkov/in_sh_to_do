import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
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
};

 class VerifyEmail extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      verifyCode: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    this.props.setVisiblePage("verifyEmail");
    this.setState({
      name: this.props.verifyEmailUser.name,
      email: this.props.verifyEmailUser.email,
      password: this.props.verifyEmailUser.password,
      verifyCode: this.props.verifyEmailUser.verifyCode
    })
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
      verifyCode: this.state.verifyCode
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
    <Grid className="Page" container direction="column" justify="flex-start">
      <Grid className="Header-wrap">
        <Header title="Verify Email"/>
      </Grid>

        <Grid className="Card-wrap" container direction="column" justify="flex-start">
          <Card className="Card">
          <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
            <TitleOfPage 
            title="Email verification to finish with Fit Trainer App"
            description="Please push verify button" /> 
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
                  disabled
                  error={errors.name}
                />                  
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
                  disabled
                  error={errors.email}
                />                   
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
                  disabled
                  error={errors.password}
                />                   
              </Grid>
              <Grid>
              <TextField                      
                  label="Verify code"
                  className="TextField"                 
                  type="text" 
                  name="verifyCode" 
                  placeholder="Password"
                  value={this.state.verifyCode}
                  onChange={this.onChange}
                  disabled 
                  error={errors.verifyCode}
                />                  
              </Grid>
              <Button onClick={this.onSubmit}  className={classNames(classes.root)}>Verify</Button>
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

VerifyEmail.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  verifyEmailUser: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  verifyEmailUser:state.auth.verifyEmailUser,
  errors: state.errors,
  displayPage:state.displayPage.displayPage
});
export default  withStyles(styles)(connect(mapStateToProps, { registerUser,setVisiblePage })(VerifyEmail));

