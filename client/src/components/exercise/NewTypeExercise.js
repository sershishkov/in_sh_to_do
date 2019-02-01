import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createExerciseType } from '../../actions/exerciseTypeActions';
import { setVisiblePage } from '../../actions/displayPageActions';
import { clearErrors } from '../../actions/erorrsAction';

import TitleOfPage from '../titleOfPage/TitleOfPage';
import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

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

 class NewTypeExercise extends Component {
   state={
    name_exercise:'',
    meauserement:'',
    errors: {}
   }

   componentDidMount(){
    this.props.setVisiblePage("NewTypeExercise");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentWillUnmount(){
    this.props.clearErrors();
  }


   onChange(e) {
    // console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit =(e) =>{
    e.preventDefault();
    const newExer = {
      name_exercise:this.state.name_exercise,
      meauserement:this.state.meauserement
    }

    this.props.createExerciseType(newExer, this.props.history);
  }


  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (

      <Grid className="Page" container direction="column" justify="flex-start">
      <Grid className="Header-wrap">
        <Header title="Create new Type Exercise"/>
      </Grid>

      <Grid className="Card-wrap" container direction="column" justify="flex-start">
        <Card className="Card">
        
          <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
            <TitleOfPage 
            title="Your can create Exercise"
            description="Please enter name and measure" /> 
          </Grid>

          <Grid  container  direction="row" justify="flex-start" alignItems="center"className="Card-body New-type-exercise-wrap " >
          <Grid item  xs={12} container  direction="row" justify="flex-start" alignItems="center" className="NewTypeExercise--create ">
          <FormControl onSubmit={this.onSubmit.bind(this)} className="FormControl FormControl__NewTypeExercise">
          
            <Grid container  direction="row" justify="space-between" alignItems="center" className="NewTypeExercise--create ">
              <Grid item xs={4}>                
                <TextField                      
                  label="Exercise Name"
                  className="TextField"                 
                  type="text" 
                  name="name_exercise" 
                  placeholder="Exercise Name"
                  onChange={this.onChange.bind(this)}
                  value={this.state.name_exercise}
                />
                {errors.name_exercise ? <Typography className={classNames(classes.this_errors)}>{errors.name_exercise}</Typography>:null}
              </Grid>
              <Grid item xs={4}>
              <Select
              name='meauserement'
              onChange={this.onChange.bind(this)}
              value={this.state.meauserement}
              className="Select"
              
              >
                            
                    <MenuItem value="0"><em> choose measuerement</em></MenuItem>
                    <MenuItem value="kilograms"> kilograms</MenuItem>
                    <MenuItem value="metres"> metres</MenuItem>
                    <MenuItem value="time"> time</MenuItem>
                    <MenuItem value="times"> times</MenuItem>
                </Select> 
                <FormHelperText>Choose measuerement</FormHelperText> 
                {errors.meauserement ? <Typography className={classNames(classes.this_errors)}>{errors.meauserement}</Typography>:null}               
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" 
                  // color="primary"
                  className={classNames(classes.root)} 
                  onClick={this.onSubmit}>
                  Create Exercise
                </Button>               
              </Grid>
              </Grid> 
              </FormControl>
            </Grid>           
          

           </Grid>
        </Card>

      </Grid>
    </Grid>     
      
    )
  }
}
NewTypeExercise.propTypes = {
  createExerciseType:PropTypes.func.isRequired,
  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors:PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {    
    displayPage:state.displayPage.displayPage,
    errors: state.errors,
  }
}

export default  withStyles(styles)(connect(mapStateToProps, {createExerciseType, setVisiblePage, clearErrors})(NewTypeExercise));


