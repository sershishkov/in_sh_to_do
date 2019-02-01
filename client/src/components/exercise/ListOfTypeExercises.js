import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAllExercisesTypes, deleteExerciseType } from '../../actions/exerciseTypeActions';
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

 class ListOfTypeExercises extends Component {
  componentWillMount(){
    this.props.getAllExercisesTypes();    
  }
  componentDidMount(){
    this.props.setVisiblePage("ListOfTypeExercises");
  }

  deleteTypeExercise = (id)=>{
    this.props.deleteExerciseType(id);
  }
  render() {
    const {typeExers} = this.props;
    const { classes } = this.props;
    const displayTypesExer =(
      <List>
      {typeExers.map((item, index)=>(
        <ListItem key={item._id} className="ItemType-wrap"> 
          <Grid container  direction="row" justify="flex-start" alignItems="center" className="ItemType-item"> 
            <Grid item xs={3}>{item.name_exercise}</Grid>
            <Grid item xs={3}>{item.meauserement}</Grid>
            <Grid item xs={2}>
              <Button 
                component={Link} 
                to={`/edit-type-exercise/${item._id}`}
                color="primary"
                variant="contained" >
                 <i className="material-icons">border_color</i>
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" 
                color="secondary" 
                onClick={()=>this.deleteTypeExercise(item._id)}>
                <i className="material-icons">delete_forever</i>
              </Button>
            </Grid>      
            
          </Grid>
        </ListItem>
      ))}
      </List>
    )
    return (
      <Grid className="Page" container direction="column" justify="flex-start">
          <Grid className="Header-wrap">
            <Header title="Create exercise"/>
          </Grid>

          <Grid className="Card-wrap" container direction="column" justify="flex-start">
            <Card className="Card">
            
              <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
                <TitleOfPage 
                title="You can create new exercise"
                description="Please create new exercise" /> 
              </Grid>

              <Grid  className="Card-body List-of-type-wrap"  container  direction="column" justify="flex-start" >
                <Grid className="Button__wrap Button__wrap--type">
                  <Button
                    variant="contained" 
                    component={Link} 
                    to="/new-type-exercise"
                    // color="primary"
                    className={classNames(classes.root)}>
                    Create type exercise
                  </Button> 
                </Grid>
                <Grid className="List__wrap List__wrap--type" container  direction="column" justify="flex-start">
                  {displayTypesExer}
                </Grid>             

               </Grid>
            </Card>

          </Grid>
        </Grid>
      
    )
  }
}

ListOfTypeExercises.propTypes ={
  typeExers:PropTypes.array.isRequired,
  getAllExercisesTypes:PropTypes.func.isRequired,
  deleteExerciseType:PropTypes.func.isRequired,
  
  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired

}

const mapStateToProps = (state, ownProps) => {
  return {
    typeExers: state.typeExers.typeExers,
    displayPage:state.displayPage.displayPage
  }
}

export default  withStyles(styles)(connect(mapStateToProps,{getAllExercisesTypes,deleteExerciseType, setVisiblePage})(ListOfTypeExercises));
