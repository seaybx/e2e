import React from 'react';
import api from '../api';


export default class SceneDetails extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			id: this.props.match.params.id,
			sceneNumber: '',
			desc:''
		}
	}
	
	componentDidMount = async () => {
		const { id } = this.state
        const scenedetails = await api.getSceneById(id)
       
        this.setState({
            sceneNumber: scenedetails.data.data.sceneNumber,
            desc: scenedetails.data.data.desc
        })
	}

	//Load data if the new scene id is not same as the current scene id
	componentWillReceiveProps = async (newProps) =>{
	    
		if(this.props.match.params.id !== newProps.match.params.id){
		   	const scenedetails = await api.getSceneById(newProps.match.params.id);

	    	this.setState({
	        sceneNumber: scenedetails.data.data.sceneNumber,
	        desc: scenedetails.data.data.desc
		    })
		}		       
	}

	deleteScene = event => {
		event.preventDefault();
		if(window.confirm('Do you want to delete this scene?'))
		{
			api.deleteScene(this.props.match.params.id);
			window.location.href= '#';
			window.location.reload();

		}
	}

	updateScene = event => {
		event.preventDefault();
		window.location.href = `#/updatescene/${this.props.match.params.id}`;
	}

	render() {
		const {sceneNumber, desc } = this.state;
		return (
			<React.Fragment>
				<div id="scene-details">
					<h1> Scene {sceneNumber} </h1>
					<h3> {desc} </h3>
				</div>
				<div className="action-buttons">
					<button name="delete-scene" onClick={this.deleteScene}> Delete Scene </button>
					<button name="edit-scene" onClick={this.updateScene}> Edit Scene </button>
				</div>
			</React.Fragment>
			);
	}
	}
