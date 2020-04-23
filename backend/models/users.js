const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersModel = new Schema (
	{
		username: {type: String, required: true, index: {unique: true, dropDups: true} },
		password: {type:String, required:true}
	},
	{ timestamps: true }
)

module.exports = mongoose.model('usersmodel', usersModel)