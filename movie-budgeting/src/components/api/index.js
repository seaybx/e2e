import axios from 'axios';

const api = axios.create({
	baseURL:'http://localhost:5000/api'
})

export const createScene = payload => api.post('/create',payload);
export const getAllScenes = () => api.get('/scenes');
export const getSceneById = id => api.get(`/scene/${id}`);
export const deleteScene = id => api.delete(`/deletescene/${id}`);
export const updateScene = (id, payload) => api.put(`/scene/${id}`, payload)

export const listUsers = () => api.get('/users');

const apis ={
	createScene,
	getAllScenes,
	getSceneById,
	deleteScene,
	updateScene,
	listUsers
}

export default apis;
