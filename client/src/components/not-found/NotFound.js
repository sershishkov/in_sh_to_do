import React from 'react';

import TitleOfPage from '../titleOfPage/TitleOfPage';
import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';


export default () => {
  return (
    <Grid className="Page" container direction="column" justify="flex-start">
    <Grid className="Header-wrap">
      <Header title="NOT FOUND"/>
    </Grid>

    <Grid className="Card-wrap" container direction="column" justify="flex-start">
      <Card className="Card">
      
        <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
          <TitleOfPage 
          title="This page does not exist"
          description="Please choose the another page" /> 
        </Grid>

        <Grid  className="Card-body Calendar-wrap"container direction="row" justify="center" alignItems="center">
          <Grid item  xs={6}>404</Grid>

         </Grid>
      </Card>

    </Grid>
  </Grid>
  );
};
