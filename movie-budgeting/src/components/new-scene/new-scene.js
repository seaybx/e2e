import React from 'react';
import api from '../api';


class CreateScene extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			sceneNumber: '',
			desc:'',
		}
	}

	handleChangeInputSceneNumber = async event => {
		//const sceneNumber = event.target.value;
		const re = /^[0-9\b]+$/;
		//const regex = new Regex(@"^\d$");
      	if (event.target.value === '' || re.test(event.target.value)) {
        	this.setState({sceneNumber: event.target.value})
      	}
		//this.setState({sceneNumber});
	}

	handleChangeInputDesc = async  event => {
		const desc = event.target.value;
		this.setState({desc});
	}

	handleCancel =() => {
		window.location.href ="/scenes";
	}
	
	handleAddScene = async() =>{
		let projectId = localStorage.getItem('defaultProjectId')
		
		const {sceneNumber, desc} =this.state;
		const payload = {sceneNumber, desc, projectId};

		await api.createScene(payload).then(res =>{
			window.alert("Scene added successfully");
			this.setState({
				sceneNumber: '',
				desc:'',
			});
			window.location.reload();
			
		}).catch(error => {
			if(error.response.status === 409) {
				window.alert("Scene number already exists");
				console.log(error);
			} else {
				window.alert("Something went wrong");
				console.log(error);
			}
		})
	}

	render(){
		const {sceneNumber, desc} =this.state;

		return (
			<React.Fragment>
				<h2>Create New Scene</h2>
				<div className="form-content">
					<label htmlFor="scene-number"><span>Scene Number </span></label>
					<input type="text" className="input-field" value={sceneNumber} id="scene-number" onChange = {this.handleChangeInputSceneNumber} />
					<br />  
					<label htmlFor="desc"><span>Description</span></label>
					<input type="text" className="input-field" value = {desc} id="desc" onChange ={this.handleChangeInputDesc} />
					<br />
					<div className="button-container">
						<button onClick = {this.handleAddScene} className="button-blue"> Add Scene </button>
						<button onClick={this.handleCancel} className="button-blue">Cancel</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default CreateScene;