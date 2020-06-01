import React from 'react'
import api from '../api'

class Login extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			username: '',
			password: '',
			jwt:'',
			loggedIn: false
		}
	}

	handleChangeInputUsername = async event => {
		const username = event.target.value
		this.setState({username})
	}

	handleChangeInputPassword = async event => {
		const password = event.target.value
		this.setState({password})
	}
	handleLogin = async () => {
		const {username, password} = this.state
		const payload = {username, password}

		await api.login(payload).then( res => {
			console.log("Login success response", res);
			if(res !== undefined) {
				const token = res.data.token
				const fullName = res.data.firstname + " " + res.data.lastname
				const userid =  res.data.userid
				localStorage.setItem('token', token);
				localStorage.setItem('user', fullName);
				localStorage.setItem('userid', userid);
							
			this.setState({
				jwt: token,
				password:'',
				loggedIn: true
			});

			window.alert("Logged in successfully");
			window.location.href="dashboard/#/dashboard"
			}

		}).catch(error => {

			console.log("error: ", error.response);
			if(error.response.status === 404) {
				window.alert("User not found");
				console.log(error);
			} 
			else if(error.response.status === 401) {
				window.alert("Password does not match");
				console.log(error);
			} else {
				window.alert("Something went wrong!!");
				console.log(error);
			}
		})
	}


	render() {
		const {username, password} = this.state
		
		return(
			<React.Fragment>
				<h2>Login</h2>
				<div className="form-content">
					<label htmlFor="username"><span>Username </span></label>
					<input type="text" className="input-field" value={username} id="username" onChange = {this.handleChangeInputUsername} />
					<br />  
					<label htmlFor="password"><span>Password</span></label>
					<input type="password" className="input-field" value = {password} id="password" onChange ={this.handleChangeInputPassword} />
					<br />
					<div className="button-container">
						<button onClick = {this.handleLogin} className="button-blue"> Login </button>
						<button className="button-blue">Cancel</button>
					</div>
				</div>
			</React.Fragment>
			)
	}
}

export default Login