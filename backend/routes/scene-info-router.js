const express = require('express');
const sceneInfoCtrl = require('../controllers/scene-info-ctrl');

const router =express.Router();

router.post('/create', sceneInfoCtrl.createScene);
router.get('/scenes', sceneInfoCtrl.listAllScenes);
router.get('/scene/:id', sceneInfoCtrl.getSceneById)
router.delete('/deletescene/:id', sceneInfoCtrl.deleteScene);
router.put('/scene/:id', sceneInfoCtrl.updateScene);

module.exports = router;