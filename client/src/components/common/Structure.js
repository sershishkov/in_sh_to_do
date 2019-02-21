import React, { Component } from 'react';

import TitleOfPage from '../titleOfPage/TitleOfPage';
import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';



 class Structure extends Component {
  render() {
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

              <Grid  className="Card-body Calendar-wrap" >
              

               </Grid>
            </Card>

          </Grid>
        </Grid>
    )
  }
}
export default Structure;



