import axios from 'axios';

const api = axios.create({
	baseURL:'http://localhost:5000/api'
})

export const createScene = payload => api.post('/create',payload);
export const getAllScenes = () => api.get('/scenes');
export const getSceneById = id => api.get(`/scene/${id}`);
export const deleteScene = id => api.delete(`/deletescene/${id}`);
export const updateScene = (id, payload) => api.put(`/scene/${id}`, payload);

export const listUsers = () => api.get('/users');
export const addUser = payload => api.post('/adduser',payload);
export const getUserInfo = id => api.get(`user/${id}`);
export const deleteUser = id => api.delete(`/deleteuser/${id}`);
export const updateUser = (id, payload) => api.put(`user/${id}`, payload)

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
	deleteUser
}

export default apis;
