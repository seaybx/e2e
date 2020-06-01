const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectsModel = new Schema (
	{
		projectName: {type:String, required:true},
		projectDesc: {type:String},
		userid: {type:String, required:true},
		status: {type:String},
		defaultProject: {type:Boolean}

	},
	{ timestamps: true }

)

module.exports = mongoose.model('projectsmodel', projectsModel)