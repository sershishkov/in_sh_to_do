import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTypeExersById, updateTypeExers, } from '../../actions/exerciseTypeActions';
import { setVisiblePage } from '../../actions/displayPageActions';

import TitleOfPage from '../titleOfPage/TitleOfPage';
import Header from '../header/Header';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
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

 class EditTypeExercise extends Component {
  state={
    name_exercise:'',
    meauserement:''
   }


   onChange(e) {   
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit =(e) =>{
    e.preventDefault();
    const newOneTypeExers = {
      id:this.props.match.params.id,
      name_exercise:this.state.name_exercise,
      meauserement:this.state.meauserement
    }

    this.props.updateTypeExers(newOneTypeExers, this.props.history);
  }
  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.getTypeExersById(id); 
    this.props.setVisiblePage("EditTypeExercise");
    
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      name_exercise:nextProps.oneTypeExers.name_exercise,
      meauserement:nextProps.oneTypeExers.meauserement
    })
  }

  
  render() {
    const { classes } = this.props;
    return (
      <Grid className="Page" container direction="column" justify="flex-start">
      <Grid className="Header-wrap">
        <Header title="Edit new Type Exercise"/>
      </Grid>

      <Grid className="Card-wrap" container direction="column" justify="flex-start">
        <Card className="Card" container direction="column" justify="flex-start">
        
          <Grid className="TitleOfPage-wrap" container direction="row" justify="center">
            <TitleOfPage 
            title="Your can edit Exercise"
            description="Please enter name and measure" /> 
          </Grid>

          <Grid  container  direction="row" justify="flex-start" alignItems="center" className="Card-body New-type-exercise-wrap " >
          <Grid item  xs={12} container  direction="row" justify="flex-start" alignItems="center" className="NewTypeExercise--create ">
          <FormControl onSubmit={this.onSubmit.bind(this)} className="FormControl FormControl__NewTypeExercise">
          
            <Grid container  direction="row" justify="space-between" alignItems="center" className="NewTypeExercise--create ">
              <Grid item xs={4}>                
                <TextField                      
                  label="Exercise Name"
                  className="TextField"                  
                  type="text" 
                  name="name_exercise" 
                  placeholder="Exercise Name"
                  onChange={this.onChange.bind(this)}
                  value={this.state.name_exercise}
                />
              </Grid>
              <Grid item xs={4}>
              <Select
              name='meauserement'
              onChange={this.onChange.bind(this)}
              value={this.state.meauserement}
              className={classNames(classes.select)}          
              >                            
                    <MenuItem value="0"><em> choose measuerement</em></MenuItem>
                    <MenuItem value="kg"> kg</MenuItem>
                    <MenuItem value="metres"> metres</MenuItem>
                    <MenuItem value="time"> time</MenuItem>
                    <MenuItem value="times"> times</MenuItem>
                </Select> 
                <FormHelperText>Choose measuerement</FormHelperText>                
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained"                  
                  className={classNames(classes.root)} 
                  onClick={this.onSubmit}>
                  Edit Exercise
                </Button>               
              </Grid>
              </Grid> 
              </FormControl>
            </Grid>           
          

           </Grid>
        </Card>

      </Grid>
    </Grid>  
    )
  }
}


EditTypeExercise.propTypes = {
  getTypeExersById:PropTypes.func.isRequired,
  updateTypeExers:PropTypes.func.isRequired,
  oneTypeExers:PropTypes.object.isRequired,
  setVisiblePage: PropTypes.func.isRequired,
  displayPage:PropTypes.string.isRequired


}
const mapStateToProps = (state, ownProps) => {  
  return {
    oneTypeExers: state.typeExers.oneTypeExers,
    displayPage:state.displayPage.displayPage
  }
}

export default withStyles(styles)(connect(mapStateToProps, {
  getTypeExersById,
   updateTypeExers,
   setVisiblePage
}) (EditTypeExercise));
