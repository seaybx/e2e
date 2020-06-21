const express = require('express');
const sceneInfoCtrl = require('../controllers/scene-ctrl');
const auth = require('../middleware/auth')

const router =express.Router();

router.post('/create', auth.authenticateToken, sceneInfoCtrl.createScene);
router.get('/scenes', auth.authenticateToken, sceneInfoCtrl.listAllScenes);
router.get('/scenes/all', sceneInfoCtrl.listAllUsersScenes);
router.get('/scene/:id', auth.authenticateToken, sceneInfoCtrl.getSceneById)
router.delete('/deletescene/:id', auth.authenticateToken, sceneInfoCtrl.deleteScene);
router.put('/scene/:id', auth.authenticateToken, sceneInfoCtrl.updateScene);

module.exports = router;