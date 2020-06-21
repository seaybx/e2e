import React from 'react';
import './App.css';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import CreateScene from '../new-scene/new-scene.js';
import SceneDetails from '../scene-details/scene-details.js';
import CreateProject from '../project/create-project.js';
import UpdateScene from '../scene-details/update-scene.js';
import ListUser from '../users/list-users.js';
import AddUser from '../users/add-user.js'
import UpdateUser from '../users/update-user.js'
import UserPanel from '../users/user-panel.js'
import Login from '../login/login.js'
import Dashboard from '../dashboard/dashboard.js'
import ListProjects from '../project/list-projects.js'
import UpdateProject from '../project/update-project.js'
import CurrentProjectInfo from '../dashboard/current-project-info'
import api from '../api';




const PrivateRoute = ({component: Component, ...rest}) => {

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
          
        <Route {...rest} render={props => (
            api.sessionValid() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            api.sessionValid() && restricted ?
                <Redirect to="dashboard/#/dashboard" />
            : <Component {...props} />
        )} />
    );
};


export default class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        isLoggedIn : false
      }
    }

  
    render() {

      let isLoggedIn = this.state.isLoggedIn;

      if(api.sessionValid()) {
         isLoggedIn = true
      }

      return (

        <HashRouter>
      {isLoggedIn 
        ?
        <div className="App">
          <header className="App-header">
            <h1>Budgeting- Scene by Scene </h1>
            <CurrentProjectInfo />
          </header>
            <div id="main-content"> 
                <PrivateRoute  path="/project/create-project" component={CreateProject} />
                <PrivateRoute  path="/new-scene" exact component={CreateScene} />
                <PrivateRoute  path="/scene/:id" exact component={SceneDetails} />
                <PrivateRoute  path="/updatescene/:id" exact component={UpdateScene} />
                <PrivateRoute  path="/users/" exact component={ListUser} />
                <PrivateRoute  path="/adduser/" exact component={AddUser} />
                <PrivateRoute  path="/updateuser/:id" exact component={UpdateUser} />
                <PrivateRoute  path="/dashboard" exact component={Dashboard} />
                <PrivateRoute  path="/projects" exact component={ListProjects} />
                <PrivateRoute  path="/updateproject/:id" exact component={UpdateProject} />

                <UserPanel />

              </div>
            <div id="sidebar"> <Sidebar /> </div>
        </div>
        :
        <div className="App">
          <header className="App-header">
            <h1>Budgeting- Scene by Scene </h1>
          </header>
          <div id="public-content">
            <PublicRoute restricted={true} exact path="/login" component={Login} />
            <UserPanel />
          </div>
        </div>
         }   

    </HashRouter>
      )
    }
  }

 


