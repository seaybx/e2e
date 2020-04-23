import React from 'react';
import NewSceneButton from '../new-scene-button/new-scene-button.js';
import SceneList from '../scene-list/scene-list.js';
import './sidebar.css';


class Sidebar extends React.Component {

    render (){
        return (
        	<React.Fragment>
        		<NewSceneButton />
            	<SceneList /> 
            </React.Fragment>
        );
    }
}
export default Sidebar;