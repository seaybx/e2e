import React from 'react';
import api from '../api';
import MetisMenu  from 'react-metismenu'
import './react-metismenu-standart.min.css'
import './scene-list.css'

class SceneList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			scenes:[],
            ascOrder : false,
            sortLabel: ""
		}
	}
	componentDidMount = async () => {
		await api.getAllScenes().then(scenes => {

			this.setState({
				scenes: scenes.data.data
			})
            this.sortScenes();
		})
	}

    sortScenes = () => {
        const {scenes} = this.state;
        let reOrderedScenes = scenes;
        let sortOrderLabel = "Descending";
        if(this.state.ascOrder) {
            reOrderedScenes = scenes.sort((a,b) => b.sceneNumber - a.sceneNumber);

        } else {
            reOrderedScenes = scenes.sort((a,b) =>  a.sceneNumber - b.sceneNumber) ; 
        }

        this.setState({
            scenes: reOrderedScenes,
            ascOrder: !this.state.ascOrder,
            sortLabel: sortOrderLabel
        })

    }

    render (){

    	const {scenes} =this.state;
    	//const sceneListContent = scenes.map (scene => {scene.sceneNumber});
    	//Create data for Metis Menu from the json received
    	let metisMenuArray = scenes.map(function(scene) {
    		return {
    			"id": scene._id, 
    			"icon": "icon-class-name", 
    			"label" : "Scene " + scene.sceneNumber, 
    			"to": "#scene/" + scene._id 
    		};
    	})
    	    	    	
        return (
            <React.Fragment>
                <div className="relative">
                    <p>Scenes </p>
                    <button onClick={this.sortScenes} className ="sort"> <i className="fa fa-sort" aria-hidden="true"></i> </button>
                </div>
                <MetisMenu content={metisMenuArray} activeLinkFromLocation />
             </React.Fragment>          
        );
    }
}
export default SceneList;