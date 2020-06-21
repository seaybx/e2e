const scenesModel = require('../models/scenes');

exports.createScene  = function(req, res) {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Scene number',
        })
    }

    const sceneinfo = new scenesModel(body)

    if (!sceneinfo) {
        return res.status(400).json({ success: false, error: err })
    }

    sceneinfo
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: sceneinfo._id,
                message: 'Scene created!',
            })
        })
        .catch(error => {
            //duplicate key
            if ( error && error.code === 11000 ) {
                return res.status(409).json({
                    error,
                    message: "Scene number already exists"
                })
          } else {
                return res.status(400).json({
                    error,
                    message: 'Scene not created!',
                })
            }
        })
}

exports.listAllScenes = async (req, res) => {

    await scenesModel.find({projectId: req.query.projectId}, (err, scenes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!scenes.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Scenes found` })
        }
        return res.status(200).json({ success: true, data: scenes })
    }).catch(err => console.log(err))
}



exports.listAllUsersScenes = async (req, res) => {

    await scenesModel.find({}, (err, scenes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!scenes.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Scenes found` })
        }
        return res.status(200).json({ success: true, data: scenes })
    }).catch(err => console.log(err))
}

exports.getSceneById = async (req, res) => {
    await scenesModel.findOne({ _id: req.params.id }, (err, scene) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!scene) {
            return res
                .status(404)
                .json({ success: false, error: `Scene not found` })
        }
        return res.status(200).json({ success: true, data: scene })
    }).catch(err => console.log(err))
}


exports.deleteScene = async (req, res) => {
    await scenesModel.findOneAndDelete({ _id: req.params.id }, (err, scene) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!scene) {
            return res
                .status(404)
                .json({ success: false, error: `Scene not found` })
        }

        return res.status(200).json({ success: true, data: scene })
    }).catch(err => console.log(err))
}

exports.updateScene = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    scenesModel.findOne({ _id: req.params.id }, (err, scene) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Scene not found!',
            })
        }
        scene.sceneNumber = body.sceneNumber
        scene.desc = body.desc
        scene
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: scene._id,
                    message: 'Scene updated!',
                })
            })
            .catch(error => {
                //duplicate key
                if ( error && error.code === 11000 ) {
                    return res.status(409).json({
                        error,
                        message: "Scene number already exists"
                    })
              } else {
                    return res.status(400).json({
                        error,
                        message: 'Scene not updated!',
                    })
                }
            })
    })
}