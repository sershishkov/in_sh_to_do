import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

 const TitleOfPage = (props) => {
  return (
    <Grid item xs={10} container  direction="column" justify="center"  className="TitleOfPage" >
      <Grid>
        <Typography variant="h5"  align="center">
           {props.title}
        </Typography> 
      </Grid>
      <Grid>
        <Typography   align="center">
           {props.description}
        </Typography>
      </Grid>
      
    </Grid>
  )
}

export default TitleOfPage;

