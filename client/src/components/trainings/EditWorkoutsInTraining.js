import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllExercisesTypes } from '../../actions/exerciseTypeActions';
import { updateOneWorkout, getWorkoutById } from '../../actions/workoutActions';
import { setVisiblePage } from '../../actions/displayPageActions';

import TitleOfPage from '../titleOfPage/TitleOfPage';
import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// const uuidv1 = require('uuid/v1');

 class EditWorkoutsInTraining extends Component {
  state={ 
    name_exercise:'',    
    repeats:'',
    quantity:''    
   }

   componentWillMount(){
     this.props.getAllExercisesTypes();
     const id = this.props.match.params.id_work;    
     this.props.getWorkoutById(id, this.props.works);
   
   }

   componentDidMount(){
    this.props.setVisiblePage("EditWorkoutsInTraining");    
  }
   onChange(e) {    
    this.setState({ [e.target.name]: e.target.value });
  }
  updateWorkout = ()=>{ 
    const findName = this.state.name_exercise; 
    const allExerc = this.props.typeExers;   
    const link = `/edit-trainig/${this.props.match.params.id_train}`
    const filtExers =  allExerc.filter(item=>{
      return item.name_exercise === findName
    })     
    const selected_id_type_of_exercise = filtExers[0]._id;
    const id_work = this.props.match.params.id_work;
    const NewWorkout = {
      id_selected_type:selected_id_type_of_exercise,
      id_workout:id_work,
      name_exercise:this.state.name_exercise,
      repeats:this.state.repeats,
      quantity:this.state.quantity
    }
   
    this.props.updateOneWorkout(NewWorkout, this.props.works, this.props.history, link);
  }

  componentWillReceiveProps(nextProps){
   
    this.setState({      
      name_exercise: nextProps.oneWorkout.name_exercise,
      repeats: nextProps.oneWorkout.repeats,
      quantity: nextProps.oneWorkout.quantity      
    })

  }  
  render() {
    const {typeExers} = this.props;
    return (
      <Grid className="Page" container direction="column" justify="flex-start">
          <Grid className="Header-wrap">
            <Header title="Edit workout in train"/>
          </Grid>

          <Grid className="Card-wrap" container direction="column" justify="flex-start">
            <Card className="Card">
            
              <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
                <TitleOfPage 
                title="Edit Workout in Trainer App"
                description="Please edit" /> 
              </Grid>

              <Grid  className="Card-body EditWorkoutsInTraining-wrap" >
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={3}>
                      <Select 
                      name="name_exercise"
                      onChange={this.onChange.bind(this)}
                      value={this.state.name_exercise}
                      className="Select "
                      >
                        <MenuItem value="0">Choose exercise</MenuItem>
                        {typeExers.map(item => (
                          
                          <MenuItem key={item._id} value={item.name_exercise}>{item.name_exercise}</MenuItem>
                        ))} 
                      </Select> 
                    </Grid>
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
                      <TextField 
                      label="Quantity"
                      className="TextField"
                      type="number" 
                      placeholder="quantity"
                      name="quantity"            
                      value={this.state.quantity}
                      onChange={this.onChange.bind(this)}/>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" 
                          color="primary" 
                          onClick={this.updateWorkout}>
                          <i className="material-icons">border_color</i>
                        </Button>                      
                    </Grid>
                </Grid>

               </Grid>
            </Card>

          </Grid>
        </Grid>      
    )
  }
}
EditWorkoutsInTraining.propTypes ={
  typeExers:PropTypes.array.isRequired,
  works:PropTypes.array.isRequired,
  oneWorkout:PropTypes.object.isRequired,
  getAllExercisesTypes:PropTypes.func.isRequired,
  updateOneWorkout:PropTypes.func.isRequired,
  getWorkoutById:PropTypes.func.isRequired,

  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    typeExers: state.typeExers.typeExers,
    oneWorkout: state.workouts.oneWorkout,
    works: state.workouts.workouts,   
    displayPage:state.displayPage.displayPage

  }
}

export default connect(mapStateToProps,{getAllExercisesTypes, updateOneWorkout, getWorkoutById, setVisiblePage})(EditWorkoutsInTraining);
