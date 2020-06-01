import React from 'react';
import api from '../api';

class AddUser extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			username: '',
			password:'',
			firstName:'',
			lastName:'',
			role:'',
			createdDate: ''
		}
	}

	handleChangeInputUsername = async  event => {
		const username = event.target.value;
		this.setState({username});
	}

	handleChangeInputPassword = async  event => {
		const password = event.target.value;
		this.setState({password});
	}

	handleChangeInputFirstName = async  event => {
		const firstName = event.target.value;
		this.setState({firstName});
	}

	handleChangeInputLastName = async  event => {
		const lastName = event.target.value;
		this.setState({lastName});
	}

	handleChangeInputRole = async  event => {
		const role = event.target.value;
		this.setState({role});
	}	

	handleCancel =() => {
		window.location.href ="/scenes";
	}
	
	handleAddUser = async() => {

		this.state.createdDate = new Date();

		const {username, password, firstName, lastName, role, createdDate } = this.state;
		const payload = {username, password, firstName, lastName, role, createdDate }
		
		if(role === '') {
			alert("Please select a role for the user")
		} else {

			await api.addUser(payload).then(res => {
				console.log(res);
				window.alert("User added successfully");
				this.setState =({
							username: '',
							password:'',
							firstName:'',
							lastName:'',
							role:'',
							createdDate: '',
							lastLoginDate: ''
				})
				window.location.reload();

			}).catch(error => {
				if(error.response.status === 409) {
					window.alert("User already exists");
					console.log(error);
				} else {
					window.alert("Something went wrong");
					console.log(error);
				}
			})
		}
	}
	render(){
		const {username, password, firstName, lastName, role, createdDate } = this.state;

		return (
				<div>
					<h2>Add User</h2>
					<div className="form-content">
						<label htmlFor="scene-number"><span>Username </span></label>
						<input type="text" className="input-field" value={username} id="username" onChange = {this.handleChangeInputUsername} />
						<br />  
						<label htmlFor="password"><span>Password</span></label>
						<input type="password" className="input-field" value = {password} id="password" onChange ={this.handleChangeInputPassword} />
						<br />
						<label htmlFor="firstname"><span>First Name </span></label>
						<input type="text" className="input-field" value={firstName} id="firstname" onChange = {this.handleChangeInputFirstName} />
						<br />
						<label htmlFor="lastname"><span>Last Name </span></label>
						<input type="text" className="input-field" value={lastName} id="lastname" onChange = {this.handleChangeInputLastName} />
						<br /> 
						<label htmlFor="role"><span>Role </span></label>
						<select name="role" id="role" value={role} className="input-field" onChange = {this.handleChangeInputRole} >
							<option value=""> Select a role</option>
							<option value="customer"> Customer</option>
							<option value="admin">Admin</option>
						</select>

						<div className="button-container">
							<button onClick = {this.handleAddUser} className="button-blue"> Add User </button>
							<button onClick={this.handleCancel} className="button-blue">Cancel</button>
						</div>
					</div>
				</div>
			)
	}
}
export default AddUser;