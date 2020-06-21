import React from 'react'
import api from '../api'

class UpdateProject extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			id: this.props.match.params.id,
			projectname: '',
			desc:'',
			user:'',
			defaultProject: false,
		}
	}

	componentDidMount = async() => {
		const { id } = this.state
		// pending - Write failure case also...
		const projectInfo = await api.getProjectInfo(id)

		this.setState({
			projectname: projectInfo.data.data.projectName,
			desc:projectInfo.data.data.projectDesc,
			user:projectInfo.data.data.userid,
			defaultProject: projectInfo.data.data.defaultProject
		})
	}

	handleChangeInputProjectName = async  event => {
		const projectname = event.target.value;
		this.setState({projectname});
	}

	handleChangeInputDesc = async  event => {
		const desc = event.target.value;
		this.setState({desc});
	}

	handleCancel =() => {
		window.location.href ="/projects/#/projects";
	}

	handleUpdateProject = async() => {
		const {id, projectname, desc } = this.state
		const user = localStorage.getItem('userid')
		this.setState({user});

		const payload = {id, projectname, desc, user}
		console.log("Payload", payload)

		await api.updateProject(id, payload).then (res => {
			window.alert("Project successfully updated")
			this.setState({
				projectname: '',
				desc:'',
				user:''
			})
			window.location.href ="/projects/#/projects"
		})
		.catch(error => {
			if(error.response.status === 409) {
				window.alert("Project name already exists");
				console.log(error);
			} else {
				window.alert("Something went wrong");
				console.log(error.response);
			}
		})

	}

	handleSetAsDefault = (event) => {
		event.preventDefault();
		const { id, projectname } = this.state
		api.setDefaultProject(id).then (res => {
			window.alert("Project set as default project")
			localStorage.setItem('defaultProjectId', this.state.id)
			localStorage.setItem('defaultProjectName', this.state.projectname)

		})
		.catch(error => {

				window.alert("Something went wrong");
				console.log(error.response);
		})
		window.location.href ="/projects/#/projects"
	}

	render() {
		const {projectname, desc, user, defaultProject} =this.state;
		console.log(this.state);

		return(
			<React.Fragment>
				<h2>Update Project</h2>
				<div className="form-content">
					<label htmlFor="scene-number"><span>Project Name </span></label>
					<input type="text" className="input-field" value={projectname} id="project-name" onChange = {this.handleChangeInputProjectName} />
					<br />  
					<label htmlFor="desc"><span>Description</span></label>
					<input type="text" className="input-field" value = {desc} id="desc" onChange ={this.handleChangeInputDesc} />
					<br />
					<div className="button-container">
						<button onClick = {this.handleUpdateProject} className="button-blue">Update Project </button>
						<button onClick = {this.handleSetAsDefault} className={`${defaultProject ? "button-grey" : "button-blue"}`}
						disabled= {defaultProject}>Set as Default Project </button>
						<button onClick={this.handleCancel} className="button-blue">Cancel</button>
					</div>
				</div>
			</React.Fragment>
			)
	}
}
export default UpdateProject