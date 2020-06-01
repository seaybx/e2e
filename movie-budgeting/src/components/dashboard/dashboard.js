import React from 'react'

export default class Dashboard extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			user:''
		}
	}
	render() {
		return (
			<h1> This is your Dashboard </h1>
			)
	}
} 