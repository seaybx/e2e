import React from 'react';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import CreateScene from '../new-scene/new-scene.js';
import SceneDetails from '../scene-details/scene-details.js';
import CreateProject from '../create-project/create-project.js';
import UpdateScene from '../scene-details/update-scene.js';
import ListUser from '../users/list-users.js';
import AddUser from '../users/add-user.js'
import UpdateUser from '../users/update-user.js'
import Login from '../login/login.js'

function App() {

  let userLoggedIn = false;

  if(!userLoggedIn) {
    window.location.href= '#/login'
  }

  return (
    <div className="App">
		<HashRouter>
			<header className="App-header">
				<h1> Budgeting- Scene by Scene </h1>
    		</header>
     		<div id="main-content"> 
          <Route path="/project/create-project" component={CreateProject} />
     			<Route path="/new-scene" exact component={CreateScene} />
          <Route path="/scene/:id" exact component={SceneDetails} />
          <Route path="/updatescene/:id" exact component={UpdateScene} />
          <Route path="/users/" exact component={ListUser} />
          <Route path="/adduser/" exact component={AddUser} />
          <Route path="/updateuser/:id" exact component={UpdateUser} />
          <Route path="/login" exact component={Login} />
     		</div>
      	</HashRouter>
          <div id="sidebar"> <Sidebar /> </div>       
    </div>
  );
}

export default App;
