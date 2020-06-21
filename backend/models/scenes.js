const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scenesModel = new Schema(
    {
        sceneNumber: { type: String, required: true },
        desc: { type: String, required: true },
        projectId: {type:String, required:true}
    },
    { timestamps: true },
)

scenesModel.index({sceneNumber: 1, projectId: 1}, {unique: true});

module.exports = mongoose.model('scenesmodel', scenesModel)