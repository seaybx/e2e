import React from 'react';
import api from '../api';
import MaterialTable from "material-table";
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

class ListProjects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects : []
		}
	}

	componentDidMount = async () => {
		const userid = localStorage.getItem('userid')
		// First getting users list to later replace userid with username in projects response.
		// May need to implement better logic. To revisit the code later.
		await api.listUsers().then(users => {
			const userList = users.data.data
			console.log("userList", userList)
			this.setState({	users : userList},
				// As callback call project list api
				() => api.listProjects(userid).then(projects => {
					this.setState({projects : projects.data.data},
					// Replace project.userid with user.username using map function	
					() => this.state.projects.map(function(project){
					    let result = userList.filter(user=> user._id === project.userid);
					    	
					    	if(result.length>0) { 
					       		project.userid=result[0].username;
					       	}
					       return project 
					  	})
						)
					})
				)
			})
		}
	

	editProject = (event, id)  => {
		event.preventDefault();
		window.location.href = `#/updateproject/${id}`;
	}

	deleteProject = (event, id) => {
		event.preventDefault();
		if(window.confirm('Do you want to delete this project?'))
		{
			console.log("id :" + id);
			api.deleteProject(id);
			window.location.reload();
		}
	}

	render() {
		const {projects} =this.state
		const projectsList = projects
		console.log(projectsList)
		
		return(
			<React.Fragment>
			 <MaterialTable
			  icons={tableIcons}
	          columns={[
	            { title: "Project Name", field: "projectName" },
	            { title: "Description", field: "projectDesc" },
	            { title: "User", field: "userid" },
	            { title: "Status", field: "status"},
	            { title: "Default Project", field:"defaultProject"}
	          ]}
	          data={projectsList}
	          title="List of Projects"
	          actions={[
		        {
		          icon: () => <DeleteOutline />,
		          tooltip: 'Delete Project',
		          onClick: (event, rowData) => {
		          	this.deleteProject(event, rowData._id);
		          }},
		          {
		          icon: () => <Edit />,
		          tooltip: 'Edit',
		          onClick: (event, rowData) => {
		          	this.editProject(event, rowData._id);
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

export default ListProjects;