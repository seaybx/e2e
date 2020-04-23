import React from 'react';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import CreateScene from '../new-scene/new-scene.js';
import SceneDetails from '../scene-details/scene-details.js';
import CreateProject from '../create-project/create-project.js';
import UpdateScene from '../scene-details/update-scene.js';
import ListUser from '../users/list-users.js';

function App() {
  return (
    <div className="App">
		<HashRouter>
			<header className="App-header">
				<h1> Budgeting- Scene by Scene </h1>
    		</header>
     		<div id="content"> 
          <Route path="/project/create-project" component={CreateProject} />
     			<Route path="/new-scene" exact component={CreateScene} />
          <Route path="/scene/:id" exact component={SceneDetails} />
          <Route path="/updatescene/:id" exact component={UpdateScene} />
          <Route path="/users/" exact component={ListUser} />

     		</div>
      	</HashRouter>
    </div>
  );
}

export default App;
