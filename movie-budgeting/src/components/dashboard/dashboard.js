import React from 'react'
import api from '../api'

export default class Dashboard extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			user:'',
			defaultProjectId: '',
			defaultProjectName: ''
		}
	}

	componentDidMount = async () => {
		const userid = localStorage.getItem('userid')
		localStorage.getItem('defaultProjectId')
		localStorage.getItem('defaultProjectName')


	}

	render() {
		const {user, defaultProjectId, defaultProjectName} =this.state

		return (
			<React.Fragment>
				<h1>Dashboard </h1>
			</React.Fragment>
			)
	}
} 