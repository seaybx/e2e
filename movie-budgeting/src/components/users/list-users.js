import React from 'react';
import api from '../api';
import MaterialTable from "material-table";
import Moment from 'react-moment';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

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
	editUser = (event, id)  => {
		event.preventDefault();
		window.location.href = `#/updateuser/${id}`;
	}

	deleteUser = (event, id) => {
		event.preventDefault();
		if(window.confirm('Do you want to delete this user?'))
		{
			console.log("id :" + id);
			api.deleteUser(id);
			window.location.reload();
		}
	}

	render() {
		const {users} =this.state;
		const userNames = users;

		return(
			<React.Fragment>
			 <MaterialTable
			  icons={tableIcons}
	          columns={[
	            { title: "Username", field: "username" },
	            { title: "First Name", field: "firstName" },
	            { title: "Last Name", field: "lastName" },
	            { title: "Role", field: "role" },
	            { title: "Created On", field: "createdDate", render:rowData =>  <Moment format="YYYY-MM-DD">{rowData.createdDate}</Moment> },
	            { title: "Last Login", field: "lastLoginDate", render:rowData =>  <Moment format="YYYY-MM-DD">{rowData.lastLoginDate}</Moment> }
	          ]}
	          data={userNames}
	          title="List of Users"
	          actions={[
		        {
		          icon: () => <DeleteOutline />,
		          tooltip: 'Delete User',
		          onClick: (event, rowData) => {
		          	this.deleteUser(event, rowData._id);
		          }},
		          {
		          icon: () => <Edit />,
		          tooltip: 'Edit',
		          onClick: (event, rowData) => {
		          	this.editUser(event, rowData._id);
		          }
		        }
		      ]}
			options={{
			          rowStyle: {
			            fontSize:'11px',
			            textAlign: 'left'
			          },
			          headerStyle: {
			          	backgroundColor: '#EEE',
			            fontSize:'11px',
			            padding: '5px',
			            textAlign: 'left'
			        },
			        pageSize:8,
		       		actionsColumnIndex: -1
		      		}}
	        />
			</React.Fragment>
			)
	}
}

export default ListUser;