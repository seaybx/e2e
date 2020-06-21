import React from 'react'
import api from '../api'

export default class CurrentProjectInfo extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			user:'',
			defaultProject:[]
		}
	}

	componentDidMount = async () => {
		const userid = localStorage.getItem('userid')

		await api.listProjects(userid).then(projects => {
			console.log("projects", projects)

			const defaultProjectData = projects.data.data.filter(project => project.defaultProject === true)
			const defaultProjectDetails = defaultProjectData

			// Set default project details if the default project is found
			if(defaultProjectDetails !== undefined && defaultProjectDetails.length > 0 ) {
				//Set the default project with its details
				this.setState({defaultProject : defaultProjectDetails })
				localStorage.setItem('defaultProjectId', defaultProjectDetails[0]._id)
				localStorage.setItem('defaultProjectName', defaultProjectDetails[0].projectName)
			}
		})
	}

	render() {
		const {user, defaultProject} =this.state
		let defaultProjectFound = false

		if (defaultProject.length > 0) {
			defaultProjectFound = true
		}

		return (
			<React.Fragment>
				{defaultProjectFound ?
				
					<h2>Current Project: {defaultProject[0].projectName} </h2>
				: 
					<h2>Current Project: No default project set </h2>
				}
				</React.Fragment>
			)
	}
} 
