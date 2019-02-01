import React, { Component } from 'react';

import Header from '../header/Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';





 class Landing extends Component {
  render() {
    return (
      <Grid className="Page" container direction="column" justify="flex-start" >
       <Header title="Welcome"/>
       <Typography variant="h3"  align="center">
         Welcome to training site
        </Typography> 
      
      </Grid>
    )
  }
}



export default Landing;


