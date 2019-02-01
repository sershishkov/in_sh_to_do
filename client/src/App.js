import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';


import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import ListOfTrainings from './components/trainings/ListOfTrainings';
import EditTrainig from './components/trainings/EditTrainig';
import CreateWorkoutsInTraining from './components/trainings/CreateWorkoutsInTraining';
import EditWorkoutsInTraining from './components/trainings/EditWorkoutsInTraining';
import NewTypeExercise from './components/exercise/NewTypeExercise';
import EditTypeExercise from './components/exercise/EditTypeExercise';
import NewWorkout from './components/workout/NewWorkout';
import EditWorkout from './components/workout/EditWorkout';
import ListOfWorkouts from './components/workout/ListOfWorkouts';
import ListOfTypeExercises from './components/exercise/ListOfTypeExercises';


import NotFound from './components/not-found/NotFound';

import './App.scss';

import Grid from '@material-ui/core/Grid';




class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router> 
          <Grid container  direction="column" justify="space-between"  className="App">
            <Grid  item  container  direction="row" justify="space-between" alignItems="flex-start" className="Container" >
              <Grid item xs={3} container className="Navbar-wrap" direction="column" justify="flex-start" >
                <Navbar item xs={12}/> 
              </Grid>

              <Grid item xs={9}  className="Main-wrap">           
                <Route exact path="/" component={Landing} />  
                <Route exact path="/sign-up" component={Register} />
                <Route exact path="/sign-in" component={Login} />
                <Route exact path="/verify-email" component={VerifyEmail} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-trainig/:id" component={EditTrainig} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-workout-in-training/:id" component={CreateWorkoutsInTraining} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-workout-in-training/:id_work/:id_train" component={EditWorkoutsInTraining} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/list-of-training" component={ListOfTrainings} />
                </Switch> 
                
                <Switch>
                  <PrivateRoute exact path="/new-type-exercise" component={NewTypeExercise} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/list-of-type-exercise" component={ListOfTypeExercises} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-type-exercise/:id" component={EditTypeExercise} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/list-of-workouts/:time" component={ListOfWorkouts} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/new-workout/:time" component={NewWorkout} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-workout/:id_work/:time" component={EditWorkout} />
                </Switch> 
                <Route exact path="/not-found" component={NotFound} />
               </Grid>
            </Grid>
            
            <Grid item  className="Footer-wrap">
              <Footer />
            </Grid>
          </Grid>
        </Router>
      </Provider>
    );
  }
}

export default  (App);


