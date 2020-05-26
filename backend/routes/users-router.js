const express = require('express');
const usersCtrl = require('../controllers/users-ctrl');
const loginCtrl = require('../controllers/login-ctrl');
const auth = require('../middleware/auth')

const router =express.Router();


router.post('/adduser', auth.authenticateToken, usersCtrl.addUser);
router.get('/users',  usersCtrl.listUsers);
router.get('/user/:id', auth.authenticateToken, usersCtrl.getUserById)
router.delete('/deleteuser/:id', auth.authenticateToken, usersCtrl.deleteUser);
router.put('/user/:id', auth.authenticateToken, usersCtrl.updateUser);
router.post('/login', loginCtrl.validateLogin);


module.exports = router;