import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllExercisesTypes } from '../../actions/exerciseTypeActions';
import { createOneWorkout } from '../../actions/workoutActions';
import { setVisiblePage } from '../../actions/displayPageActions';

import TitleOfPage from '../titleOfPage/TitleOfPage';
import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
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
  select:{
    width:"80%"
  }
};


const uuidv1 = require('uuid/v1');

 class CreateWorkoutsInTraining extends Component {
  state={ 
    name_exercise:'',    
    repeats:'',
    quantity:'',
    measure:''     
   }
   componentWillMount(){
    this.props.getAllExercisesTypes();    
  }
  componentDidMount(){
    this.props.setVisiblePage("CreateWorkoutsInTraining");
  }
  onChange(e) {
   
   this.setState({ [e.target.name]: e.target.value });

   if(e.target.name === 'name_exercise' ){
    const findName = e.target.value;     
    const allExerc = this.props.typeExers;     
    const itemWithMeasure = allExerc.filter(item=>{
        return item.name_exercise === findName
      }); 

      
      if(itemWithMeasure.length>0){
        const measure = itemWithMeasure[0].meauserement;      
        this.setState({
          measure:measure
        })
      } else{
        this.setState({
          measure:''
        })
      }     
    
  }
 }
 createWorkout = ()=>{ 

  if(!(this.state.name_exercise && this.state.repeats && this.state.quantity)){
    return;
  }

   const findName = this.state.name_exercise; 
   const allExerc = this.props.typeExers;   
   const link = `/edit-trainig/${this.props.match.params.id}`; 
   const filtExers =  allExerc.filter(item=>{
     return item.name_exercise === findName
   }) 
   const selected_id_type_of_exercise = filtExers[0]._id;
   
   const NewWorkout = {
     id_selected_type:selected_id_type_of_exercise,
     id_workout:uuidv1(),
     name_exercise:this.state.name_exercise,
     repeats:this.state.repeats,
     quantity:this.state.quantity
   }

   this.props.createOneWorkout(NewWorkout, this.props.history, link)
 }  
 render() {  
  const {typeExers} = this.props;
  const { classes } = this.props;
   return (
    <Grid className="Page" container direction="column" justify="flex-start">
    <Grid className="Header-wrap">
      <Header title="New workout in update training"/>
    </Grid>

    <Grid className="Card-wrap" container direction="column" justify="flex-start">
      <Card className="Card">
      
        <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
          <TitleOfPage 
          title="Create workout in Trainer App"
          description="Please Create workout" /> 
        </Grid>

        <Grid  className="Card-body CreateWorkoutsInTraining-wrap" container direction="row" justify="space-between" spacing={Number(30)} >
          <Grid item xs={3} container  direction="row" justify="center" alignItems="center">
            <Select 
            name="name_exercise"
            onChange={this.onChange.bind(this)}
            value={this.state.name_exercise}
            className={classNames(classes.select)}
            >
              <MenuItem value="0">Choose exercise</MenuItem>
              {typeExers.map(item => (
                
                <MenuItem key={item._id} value={item.name_exercise}>{item.name_exercise}</MenuItem>
              ))} 
            </Select>
          </Grid>
          <Grid item xs={2} container  direction="row" justify="center" alignItems="center">
            <TextField 
            label="Repeats"
            className="TextField"
            type="number" 
            placeholder="repeats" 
            name="repeats"          
            value={this.state.repeats}
            onChange={this.onChange.bind(this)}
            /> 
          </Grid>
          <Grid item xs={2} container  direction="row" justify="center" alignItems="center">
              <TextField 
              label="Quantity"
              className="TextField"
              type="number" 
              placeholder="quantity"
              name="quantity"            
              value={this.state.quantity}
              onChange={this.onChange.bind(this)}/>
          </Grid>
          <Grid item xs={2} container  direction="row" justify="center" alignItems="center">
            <Grid container  direction="row" justify="center" alignItems="center">{this.state.measure}</Grid>
          </Grid>
          <Grid item xs={2} container  direction="row" justify="center" alignItems="center">
            <Button variant="contained"              
              className={classNames(classes.root)} 
              onClick={this.createWorkout}>
              Create work
            </Button>            
          </Grid>
         </Grid>
      </Card>

    </Grid>
  </Grid>

    
   )
 }


}
CreateWorkoutsInTraining.propTypes ={
  typeExers:PropTypes.array.isRequired,
  getAllExercisesTypes:PropTypes.func.isRequired,
  createOneWorkout:PropTypes.func.isRequired,
  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    typeExers: state.typeExers.typeExers,
    displayPage:state.displayPage.displayPage
  }
}

export default  withStyles(styles)(connect(mapStateToProps, {getAllExercisesTypes, createOneWorkout, setVisiblePage })(CreateWorkoutsInTraining));



 





