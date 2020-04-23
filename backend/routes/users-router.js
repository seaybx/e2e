const express = require('express');
const usersCtrl = require('../controllers/users-ctrl');

const router =express.Router();

router.post('/adduser', usersCtrl.addUser);
router.get('/users', usersCtrl.listUsers);
// router.get('/scene/:id', sceneInfoCtrl.getSceneById)
// router.delete('/deletescene/:id', sceneInfoCtrl.deleteScene);
// router.put('/updatescene/:id', sceneInfoCtrl.updateScene);

module.exports = router;