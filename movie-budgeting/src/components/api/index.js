import axios from 'axios'
import Swal from 'sweetalert2'

const api = axios.create({
	baseURL:'http://localhost:5000/api'
})


// Add 403 response interceptor
api.interceptors.response.use(undefined, err => {
    const error = err.response;
    console.log("Interceptor Error log", error)
    if (error.status===403) {
    	Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. You will be redirected to the login page",
            type: "warning"
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userid')
        localStorage.removeItem('user')
    	window.location.href="/login/#/login"
     }
     return Promise.reject(err);
  });

  export const sessionValid = () => {
    let token = localStorage.getItem('token')
    if(token !== null){
         api.defaults.headers.common['Authorization'] = `Basic ${token}`;
      return true
    } else {
      window.location.href="/login/#/login";
      return false
    }
  }
    

export const createScene = payload => api.post('/create',payload)
export const getAllScenes = () => api.get('/scenes')
export const getSceneById = id => api.get(`/scene/${id}`)
export const deleteScene = id => api.delete(`/deletescene/${id}`)
export const updateScene = (id, payload) => api.put(`/scene/${id}`, payload)

export const listUsers = () => api.get('/users')
export const addUser = payload => api.post('/adduser',payload)
export const getUserInfo = id => api.get(`user/${id}`)
export const deleteUser = id => api.delete(`/deleteuser/${id}`)
export const updateUser = (id, payload) => api.put(`user/${id}`, payload)

export const login = payload => api.post('/login', payload)

export const addProject = payload => api.post('/createproject', payload)
export const deleteProject = id => api.delete(`/deleteproject/${id}`)
export const listProjects = () => api.get('/projects')
export const getProjectInfo = id => api.get(`project/${id}`)
export const updateProject = (id, payload) => api.put(`project/${id}`, payload)

const apis ={
	createScene,
	getAllScenes,
	getSceneById,
	deleteScene,
	updateScene,
	listUsers,
	addUser,
	getUserInfo,
	updateUser,
	deleteUser,
	login,
	sessionValid,
	addProject,
	listProjects,
	deleteProject,
	getProjectInfo,
	updateProject
}

export default apis;
