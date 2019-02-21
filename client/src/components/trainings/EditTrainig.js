import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { swapWorkoutUp, swapWorkoutDown, deleteWorkout, getWorksInTraining, clearAllWorkouts,addArrayOfWorkouts} from '../../actions/workoutActions';
import { updateOneTrainig, getTrainingById} from '../../actions/trainigAction';
import { setVisiblePage } from '../../actions/displayPageActions';

import TitleOfPage from '../titleOfPage/TitleOfPage';
import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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


const uuidv1 = require('uuid/v1');

 class EditTrainig extends Component {

  
componentWillMount(){
  const { id } = this.props.match.params;     
  this.props.getTrainingById(id); 
  
  this.props.setVisiblePage("EditTrainig");
} 

  swapUp = (workData,index) =>{
    this.props.swapWorkoutUp(workData,index);
    this.forceUpdate();
  }
  swapDown = (workData,index) =>{
    this.props.swapWorkoutDown(workData, index);
    this.forceUpdate();
  }
  deleteWorkout = (workData, index) =>{
    
    this.props.deleteWorkout(workData, index);
  }
  updateTraining = () =>{
    

    const works = this.props.works;
    const listOfTWorkouts = works.map((item, i)=>{
      return {
        exercise_ID:item.id_selected_type,
        repeats:item.repeats,
        quantity:item.quantity
      }
    });
    
    const newTraining = {
      _id:this.props.match.params.id,
       data_work:this.props.oneTrainig.data_work,     
       exercise_in:listOfTWorkouts
    
    }
    
    this.props.updateOneTrainig(newTraining, this.props.history);
    this.props.clearAllWorkouts();
  }
  render() {
    const {works} = this.props;
    
    const { classes } = this.props;
    const displayWorks = (
    <List>     
      {works.map((item,i) =>{
       
        return (       
       <ListItem key={uuidv1()}>
          <Grid container direction="row" justify="flex-start">
            <Grid item xs={5}>{item.name_exercise}</Grid>           
            <Grid item xs={1}>{item.repeats}</Grid>
            <Grid item xs={1}>{item.quantity}</Grid>
            <Grid item xs={1}>
              <Button 
                component={Link} 
                to={`/edit-workout-in-training/${item.id_workout}/${this.props.match.params.id}`}
                color="primary"
                variant="contained" >
                <i className="material-icons">border_color</i>
              </Button>
             
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" 
                  color="primary" 
                  onClick={()=>this.swapUp(this.props.works, i)}
                  disabled={i<1}>
                 <i className="material-icons">arrow_upward</i>
              </Button>              
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" 
                  color="primary" 
                  onClick={()=>this.swapDown(this.props.works, i)}
                  disabled={i>works.length-2}>
                 <i className="material-icons">arrow_downward</i>
              </Button>               
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" 
                  color="secondary" 
                  onClick={()=>this.deleteWorkout(this.props.works, i)}
                 >
                 <i className="material-icons">delete_forever</i>
              </Button>                
            </Grid>
          </Grid>   
       
       </ListItem>
     )
      })}
    </List>
    )


    return (
      <Grid className="Page" container direction="column" justify="flex-start">
          <Grid className="Header-wrap">
            <Header title="Edit Training"/>
          </Grid>

          <Grid className="Card-wrap" container direction="column" justify="flex-start">
            <Card className="Card">
            
              <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
                <TitleOfPage 
                title="Edit training in Trainer App"
                description="Please Edit training" /> 
              </Grid>

              <Grid  className="Card-body EditTrainig-wrap"  container direction="column" justify="flex-start">
                <Grid>
                    <Button 
                    component={Link} 
                    to={`/create-workout-in-training/${this.props.match.params.id}`}                    
                    className={classNames(classes.root)}
                    variant="contained" >
                       Create workout
                  </Button>
               
                </Grid>
                <Grid>
                  {displayWorks}
                </Grid>
                <Grid>
                  <Button variant="contained"                  
                  className={classNames(classes.root)}
                  onClick={this.updateTraining}
                  disabled={this.props.works.length<1}
                  >
                  Update training
                  </Button>
                </Grid> 
               </Grid>
            </Card>

          </Grid>
        </Grid>
     
    )
  }
}

EditTrainig.propTypes ={
  works:PropTypes.array.isRequired,
  oneTrainig:PropTypes.object.isRequired,
  updateOneTrainig:PropTypes.func.isRequired,
  getTrainingById:PropTypes.func.isRequired,

  swapWorkoutUp:PropTypes.func.isRequired,
  swapWorkoutDown:PropTypes.func.isRequired,
  deleteWorkout:PropTypes.func.isRequired,
  getWorksInTraining:PropTypes.func.isRequired,
  clearAllWorkouts:PropTypes.func.isRequired,
  addArrayOfWorkouts:PropTypes.func.isRequired,

  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
   
  return {
    oneTrainig: state.trainigs.oneTrainig,
    works: state.workouts.workouts,
    displayPage:state.displayPage.displayPage
  }
}
export default  withStyles(styles)(connect(mapStateToProps,
   {  updateOneTrainig,
      getTrainingById,
      swapWorkoutUp,
      swapWorkoutDown,
      deleteWorkout,
      getWorksInTraining,
      clearAllWorkouts,
      setVisiblePage,
      addArrayOfWorkouts } )(EditTrainig));
