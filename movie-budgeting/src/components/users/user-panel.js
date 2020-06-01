import React from 'react'
import api from '../api'
import { slide as Menu } from 'react-burger-menu'
import './burger-menu.css'

class UserPanel extends React.Component {
	constructor(props) {
		super(props)
		this.state ={
			loggedinUser: '',
			isLoggedIn: false,
			role:''
		}
	}

	logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
        localStorage.removeItem('userid')
		window.location.href ="/login/#/login";
	}

	render() {
		let isLoggedIn = this.state.isLoggedIn;
		let user = localStorage.getItem('user');

	    if(api.sessionValid()) {
	         isLoggedIn = true
	    }

		return (
			<div>
				{isLoggedIn 
					?
				<div id="top-user-panel"> 
						<div id="user-actions">
							<span>Hi {user}</span>
							<span> | <a href="#" onClick={this.logout} > Logout </a> </span>
						</div>
						<Menu right noOverlay width={ '285px' }>
					        <a id="home" className="menu-item" href="#/users">Users</a>
					        <a id="about" className="menu-item" href="#projects">My Projects</a>
					        <a className="menu-item--small" href="/">Settings</a>
				      </Menu>
				</div>
				: 
				<div> </div>
				}
			</div>
		)

	}
}

export default UserPanel;