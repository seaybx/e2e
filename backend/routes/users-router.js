const express = require('express');
const usersCtrl = require('../controllers/users-ctrl');

const router =express.Router();

router.post('/adduser', usersCtrl.addUser);
router.get('/users', usersCtrl.listUsers);
router.get('/user/:id', usersCtrl.getUserById)
router.delete('/deleteuser/:id', usersCtrl.deleteUser);
router.put('/user/:id', usersCtrl.updateUser);

module.exports = router;