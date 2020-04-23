import React from 'react';
import api from '../api';

class ListUser extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: []
		}

	}

	componentDidMount = async () => {
		await api.listUsers().then(users =>{

			this.setState({
				users : users.data.data
			})
		})

	}

	render() {
		const {users} =this.state;
		const userNames = users

		return(
			<React.Fragment>
			<h2> List of Users </h2>
				<ul> 
				{userNames.map(s => (
					<li key={s._id}> {s.username} </li>
					))}
				</ul>
			</React.Fragment>
			)
	}
}

export default ListUser;