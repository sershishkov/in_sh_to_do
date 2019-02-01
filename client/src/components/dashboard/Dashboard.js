import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getAllTrainigs} from '../../actions/trainigAction';
import { setVisiblePage } from '../../actions/displayPageActions';

import InfiniteCalendar, {
  Calendar,  
  withMultipleDates,
  defaultMultipleDateInterpolation
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import Header from '../header/Header';
import TitleOfPage from '../titleOfPage/TitleOfPage';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';


 class Dashboard extends Component {
  onSelect = (value) =>{
    const date = value.getTime();

    const train = this.props.trainigs;

    const filteredTrain = train.filter(item =>{
      return date === new Date(item.data_work).getTime();
    })

  if(filteredTrain.length>0){
    this.props.history.push(`/edit-trainig/${filteredTrain[0]._id}`)
  }else{
    this.props.history.push(`/list-of-workouts/${date}`)
  }
   
   }

   componentDidMount(){
    this.props.getAllTrainigs();
    this.props.setVisiblePage("dashboard");
  }

  render() {
    const {trainigs}  = this.props;
    const selectedDays = trainigs.map((item, i) =>{
      return new Date(item.data_work);
    })  
   
    
    return (

      <Grid className="Page" container direction="column" justify="flex-start">
          <Grid className="Header-wrap">
            <Header title="Dashboard"/>
          </Grid>

          <Grid className="Card-wrap" container direction="column" justify="flex-start">
            <Card className="Card">

              <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
                <TitleOfPage 
                title="Your calendar in Trainer App"
                description="Please choose the date" /> 
              </Grid>

              <Grid  className="Card-body Calendar-wrap" container  direction="column" justify="flex-start" alignItems="center">
                  <Grid item xs={6}>
                    <InfiniteCalendar
                    width={300}
                    height={250}
                    Component={withMultipleDates(Calendar)}
                    selected={selectedDays}
                    interpolateSelection={defaultMultipleDateInterpolation}
                    onSelect={this.onSelect}          
                  />
                 </Grid>
               </Grid>
            </Card>

          </Grid>
        </Grid> 

     
    )
  }
}
Dashboard.propTypes ={
  trainigs:PropTypes.array.isRequired,
  getAllTrainigs:PropTypes.func.isRequired,
  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {

  return {
    
    trainigs: state.trainigs.trainigs,
    displayPage:state.displayPage.displayPage
  }
}

export default connect(mapStateToProps, {getAllTrainigs, setVisiblePage }) (Dashboard);

