import React from 'react';
import api from '../api';


class UpdateScene extends React.Component {
	constructor(props){
		super(props);
		// let currentScene ='';
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
            desc: scenedetails.data.data.desc,
            currentScene: scenedetails.data.data.sceneNumber
        })
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

	handleUpdateScene = async() => {
		const {id, sceneNumber, desc} =this.state;
		const payload = {sceneNumber, desc};
		console.log(this.state);

		await api.updateScene(id, payload).then( res => {
			window.alert("Scene updated successfully");
			this.setState({
				sceneNumber: '',
				desc:''
			});

			window.location.href= '#scenes';
			window.location.reload();
			
		}).catch(error => {
			if(error.response.status === 409) {
				window.alert("Scene number already exists");
				console.log(error);
			} else {
				window.alert("Something went wrong");
				console.log(error.response);
			}
			
		})
	}

	render(){
		const {sceneNumber, desc, currentScene} =this.state;
		console.log("update Scene Number : " + sceneNumber);

		return (
			<React.Fragment>
				<h1>Update Scene {currentScene} </h1>
				
				<div className="form-content">
					<label htmlFor="scene-number"><span>Scene Number </span></label>
					<input type="text" className="input-field" value={sceneNumber} id="scene-number" onChange = {this.handleChangeInputSceneNumber} />
					<br />  
					<label htmlFor="desc"><span>Description</span></label>
					<input type="text" className="input-field" value = {desc} id="desc" onChange ={this.handleChangeInputDesc} />
					<br />
					<div className="button-container"> 
						<button onClick = {this.handleUpdateScene} className="button-blue"> Update Scene </button>
						<button onClick={this.handleCancel} className="button-blue">Cancel</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default UpdateScene;