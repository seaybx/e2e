const projectsModel = require('../models/projects');

exports.addProject = async (req, res) => {
	const body = req.body
	//console.log(body);
	let project =[];
	    project.projectName = body.projectname
        project.projectDesc = body.desc
        project.userid = body.user
        project.defaultProject = false
        project.status = 'active'

	if(!project) {
		return res.status(400).json({
			success:false,
			error: "Project Name and Description is required"
		})
	}

	const projectsmodel = new projectsModel(project)

	if(!projectsmodel){
		return res.status(400).json({
			success:false,
			error:err
		})
	}
	

	projectsmodel.save().then( () =>
	{
		return res.status(201).json({
			success:true,
			message: "Successfully created new project"
			})
		}).catch(error => {
			return res.status(400).json({
				success:false,
				message: "Project not created"
			})
		})

}

exports.listProjects = async (req,res) => {
	await projectsModel.find({userid: req.query.userid}, (err, projects) => {
		console.log(req.query.userid);
		console.log("projects", projects);
		if(err){
			return res.status(400).json({
				success:false,
				error: err
			})
		}
		if (!projects.length) {
			return res
				.status(404)
				.json({
					success:false,
					message:"Projects not found"
			})
		}
		return res.status(200).json({
			success:true,
			data: projects
		})
	}).catch(err => console.log (err))
}

exports.getProjectById = async (req, res) => {
	await projectsModel.findOne ({_id: req.params.id}, (err, project) =>{
		if(err){
			return res.status(400).json({success:false, error:err})
		}
		if(!project) {
			return res.status(404).json({ success:false, error:"Project not found"})
		}
		console.log("user :" + project)
		return res.status(200).json({success:true, data: project})
	}).catch( err => console.log(err))
}

exports.updateProject = async (req,res) => {
	
	const body = req.body

	if(!body) {
		return res.status(400).json({
			success:false,
			message:"You must provide a body to update"
		})
	}

	projectsModel.findOne({_id:req.params.id}, (err, project) => {
		if (err) {
            return res.status(404).json({
                err,
                message: 'Project not found!',
            })
        }
        project.projectName = body.projectname
        project.projectDesc = body.desc
        project.userid = body.user


        project.save().then(
        	() => {
        		return res.status(200).json({
        			success:true,
        			message: 'Project updated'
        		})
        	})
            .catch(error => {
                //duplicate key
                if ( error && error.code === 11000 ) {
                    return res.status(409).json({
                        error,
                        message: "Project Name already exists!"
                    })
              } else {
                    return res.status(400).json({
                        error,
                        message: 'Project not Updated!',
                    })
                }
            })
	})
}

exports.deleteProject = async (req, res) => {
	console.log("Id", req.params.id)
	await projectsModel.findOneAndDelete({ _id: req.params.id}, (err, project) => {
		if(err){
			return res.status(400).json({
				success:false,
				error: err
			})
		}
		if(!project){
			return res.status(404).json({
				success:false,
				error:err
			})
		}
		return res.status(200).json({
			success:true,
			data: project
		})
	}).catch(err => console.log(err))
}

exports.setAsDefaultProject = async (req, res) => {
	console.log("Id", req.params.id)

	await projectsModel.findOneAndUpdate({ _id: req.params.id},{defaultProject: true}, (err, project) => {
		if(err){
				return res.status(400).json({
					success:false,
					error: err
				})
			}
			if(!project){
				return res.status(404).json({
					success:false,
					error:err
				})
			}
			return res.status(200).json({
				success:true,
				data: project
			})
		}).catch(err => console.log(err))
}
