const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scenesModel = new Schema(
    {
        sceneNumber: { type: String, required: true, index: {unique: true, dropDups: true} },
        desc: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('scenesmodel', scenesModel)