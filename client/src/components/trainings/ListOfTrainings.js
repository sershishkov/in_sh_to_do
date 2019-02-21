import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {getAllTrainigs, deleteOneTrainig} from '../../actions/trainigAction';
import { getWorksInTraining } from '../../actions/workoutActions';
import { setVisiblePage } from '../../actions/displayPageActions';

import TitleOfPage from '../titleOfPage/TitleOfPage';
import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


 class ListOfTrainings extends Component {
  state = {
    expanded: null,
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

componentWillMount(){
  
}

componentDidMount(){  
  this.props.setVisiblePage("ListOfTrainings");
  this.props.getAllTrainigs();
}

deleteTrainig = (id) =>{
  this.props.deleteOneTrainig(id);
}
getWorksIntrain= (id)=>{
  this.props.getWorksInTraining(id); 
}


  render() {
    const { trainigs } = this.props;    
    const { expanded } = this.state;
    const displayWorks = (
    <List>
        { trainigs.length>0 ? (trainigs.map((trainig, i)=>{
          return (            
          <ListItem key={trainig._id} >
            <ExpansionPanel expanded={expanded === `panel${i}`} onChange={this.handleChange(`panel${i}`)} className=" myExpansionPanel">
                  <ExpansionPanelSummary 
                  expandIcon={<ExpandMoreIcon />}
                   >
                    <Grid  container direction="row" justify="space-between">
                      <Grid item xs={3}>Training # {i+1}{' '}</Grid>
                      <Grid item xs={3}> Date:{' '}{moment(trainig.data_work).format('DD MM YYYY')}</Grid>
                      <Grid item xs={3}>
                        <Button component={Link} 
                        to={`/edit-trainig/${trainig._id}`} color="primary"
                         variant="contained" onClick={()=>this.getWorksIntrain(trainig._id)}>
                        <i className="material-icons">border_color</i> train
                      </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" 
                          color="secondary" 
                          onClick={()=>this.deleteTrainig(trainig._id)}>
                         <i className="material-icons">delete_forever</i>
                        </Button>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="myExpansionPanelDetails ">                    
                      <List className="myExpansionPanelDetailsListIn ">
                        { trainig.exercise_in.map((typeExer, i) =>{
  
                            return(
                                <ListItem key={typeExer._id}> 
                                <Grid container direction="row" justify="space-between">                       
                                  <Grid item xs={3}>{typeExer.name_exercise}{' '}</Grid>
                                  <Grid item xs={3}>{typeExer.meauserement}{' '}</Grid>
                                  <Grid item xs={3}>Repeats:{typeExer.repeats}{' '}</Grid>
                                  <Grid item xs={3}>Quantity:{typeExer.quantity}{' '}</Grid>
                                </Grid>
                                </ListItem>
                            ) 
                      
                          }) }
                      </List>
                    
                  </ExpansionPanelDetails>
              </ExpansionPanel>
          </ListItem>
        )
        })

        ) : null }
             
    </List>
    )
    return (
      <Grid className="Page" container direction="column" justify="flex-start">
          <Grid className="Header-wrap">
            <Header title="ListOfTrainings"/>
          </Grid>

          <Grid className="Card-wrap" container direction="column" justify="flex-start">
            <Card className="Card">
            
              <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
                <TitleOfPage 
                title="List of your trainings in Trainer App"
                description="Please Edit the training" /> 
              </Grid>

              <Grid  className="Card-body List-of-train-wrap " >
               {displayWorks} 
               </Grid>
            </Card>

          </Grid>
        </Grid>      
    )
  }
}
ListOfTrainings.propTypes ={
  trainigs:PropTypes.array.isRequired,
  getAllTrainigs:PropTypes.func.isRequired,
  deleteOneTrainig:PropTypes.func.isRequired,
  getWorksInTraining:PropTypes.func.isRequired,

  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {

  return {
    trainigs: state.trainigs.trainigs,   
    displayPage:state.displayPage.displayPage,
    oneTrainig:state.trainigs.oneTrainig
  }
}

export default connect(mapStateToProps, {getAllTrainigs, deleteOneTrainig, setVisiblePage, getWorksInTraining}) (ListOfTrainings);
