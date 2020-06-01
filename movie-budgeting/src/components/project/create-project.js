import React from 'react';
import api from '../api';


class CreateProject extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			projectname: '',
			desc:'',
			user:''
		}
	}

	handleChangeInputProjectName = async event => {
		//const sceneNumber = event.target.value;
        	this.setState({projectname: event.target.value})
	}

	handleChangeInputDesc = async  event => {
		const desc = event.target.value;
		this.setState({desc});
	}


	handleCancel =() => {
		window.location.href ="projects/#/projects";
	}
	
	handleAddProject = async() => {

		const {projectname, desc} =this.state;
		const user = localStorage.getItem('userid');
		this.setState({user});
		const payload = {projectname, desc, user};
		console.log("Payload", payload)

		await api.addProject(payload).then(res =>{
			window.alert("Project added successfully");
			this.setState({
				projectname: '',
				desc:'',
				user:''
			});
			 window.location.href ="projects/#/projects";
			
		}).catch(error => {
			if(error.response.status === 409) {
				window.alert("Project name already exists");
				console.log(error);
			} else {
				window.alert("Something went wrong");
				console.log(error);
			}
		})
	}

	render(){
		const {projectname, desc, user} =this.state;

		return (
			<React.Fragment>
				<h2>Create New Project</h2>
				<div className="form-content">
					<label htmlFor="scene-number"><span>Project Name </span></label>
					<input type="text" className="input-field" value={projectname} id="project-name" onChange = {this.handleChangeInputProjectName} />
					<br />  
					<label htmlFor="desc"><span>Description</span></label>
					<input type="text" className="input-field" value = {desc} id="desc" onChange ={this.handleChangeInputDesc} />
					<br />
					<div className="button-container">
						<button onClick = {this.handleAddProject} className="button-blue">Create Project </button>
						<button onClick={this.handleCancel} className="button-blue">Cancel</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default CreateProject;