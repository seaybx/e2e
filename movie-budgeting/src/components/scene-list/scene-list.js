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
        let projectId = localStorage.getItem('defaultProjectId')
		await api.getAllScenes(projectId).then(scenes => {

			this.setState({
				scenes: scenes.data.data
			})
            this.sortScenes();
		})
        .catch(error => {
            console.log(error.response);
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
        let metisMenuArray 
        console.log("scenes.length", scenes.length)

        if(scenes.length > 0){
    	
        	//Create data for Metis Menu from the json received
        	metisMenuArray = scenes.map(function(scene) {
        		return {
        			"id": scene._id, 
        			"icon": "icon-class-name", 
        			"label" : "Scene " + scene.sceneNumber, 
        			"to": "#scene/" + scene._id 
        		};
        	})

    }
    	    	    	
        return (
            <div>
            {scenes.length > 0 ?
                <div>
                    <div className="relative">
                        <p>Scenes </p>
                        <button onClick={this.sortScenes} className ="sort"> <i className="fa fa-sort" aria-hidden="true"></i> </button>
                    </div>

                    <MetisMenu content={metisMenuArray} activeLinkFromLocation />
                </div>

                : ''
                } 
            </div>  
        );
    }
}
export default SceneList;