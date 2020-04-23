const usersModel = require('../models/users');

exports.addUser = (req, res) => {
	const body = req.body

	if(!body) {
		return res.status(400).json({
			success:false,
			error: "Username and Password is required"
		})
	}

	const usersmodel = new usersModel(body)

	if(!usersmodel){
		return res.status(400).json({
			success:false,
			error:err
		})
	}

	usersmodel.save().then( () =>
	{
		return res.status(201).json({
			success:true,
			message: "Successfully created user"
		})
		.catch(error => {
			return res.status(400).json({
				success:false,
				message: "User not added"
			})
		})
	})

}

exports.listUsers = async (req,res) => {
	await usersModel.find({}, (err, users) => {
		if(err){
			return res.status(400).json({
				success:false,
				error: err
			})
		}
		if (!users.length) {
			return res
				.status(404)
				.json({
					success:false,
					message:"Users not found"
			})
		}
		return res.status(200).json({
			success:true,
			data: users
		})
	}).catch(err => console.log (err))
}