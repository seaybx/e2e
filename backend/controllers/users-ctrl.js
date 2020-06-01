const usersModel = require('../models/users');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10)
	const body = req.body
	body.password = hashedPassword

	//console.log(body);
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
		}).catch(error => {
			return res.status(400).json({
				success:false,
				message: "User not added"
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

exports.getUserById = async (req, res) => {
	await usersModel.findOne ({_id: req.params.id}, (err, user) =>{
		if(err){
			return res.status(400).json({success:false, error:err})
		}
		if(!user) {
			return res.status(404).json({ success:false, error:"User not found"})
		}
		console.log("user :" + user)
		let userData = {
			id:user._id, 
			username: user.username, 
			firstName:user.firstName, 
			lastName: user.lastName,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
			}
		return res.status(200).json({success:true, data: userData})
	}).catch( err => console.log(err))
}

exports.updateUser = async (req,res) => {
	
	const hashedPassword = await bcrypt.hash(req.body.password, 10)
	const body = req.body

	if(!body) {
		return res.status(400).json({
			success:false,
			message:"You must provide a body to update"
		})
	}

	usersModel.findOne({_id:req.params.id}, (err, user) => {
		if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.username = body.username
        user.password = hashedPassword
        user.firstName = body.firstName
        user.lastName = body.lastName
        user.role = body.role

        user.save().then(
        	() => {
        		return res.status(200).json({
        			success:true,
        			message: 'User updated'
        		})
        	})
            .catch(error => {
                //duplicate key
                if ( error && error.code === 11000 ) {
                    return res.status(409).json({
                        error,
                        message: "Username already exists!"
                    })
              } else {
                    return res.status(400).json({
                        error,
                        message: 'User not Updated!',
                    })
                }
            })
	})
}

exports.deleteUser = async (req, res) => {
	await usersModel.findOneAndDelete({ _id: req.params.id}, (err,user) => {
		if(err){
			return res.status(400).json({
				success:false,
				error: err
			})
		}
		if(!user){
			return res.status(404).json({
				success:false,
				error:err
			})
		}
		return res.status(200).json({
			success:true,
			data: user
		})
	}).catch(err => console.log(err))
}

