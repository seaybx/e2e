const express = require('express');
const projectsCtrl = require('../controllers/projects-ctrl');
const auth = require('../middleware/auth')

const router =express.Router();


router.post('/createproject', projectsCtrl.addProject);
router.get('/projects',  projectsCtrl.listProjects);
router.get('/project/:id', projectsCtrl.getProjectById)
router.delete('/deleteproject/:id', projectsCtrl.deleteProject);
router.put('/project/:id', projectsCtrl.updateProject);
router.put('/project/defaultproject/:id', projectsCtrl.setAsDefaultProject);


module.exports = router;