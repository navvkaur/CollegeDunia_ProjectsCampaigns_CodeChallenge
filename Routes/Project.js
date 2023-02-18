const express = require('express');
const router= express();
const controller = require('../Controllers/Project_Controller')


router.post('/addproject_detail',controller.addProjectDetail);
router.get('/getproject_detail',controller.getProjectDetail);
router.delete('/deleteproject_detail/:id',controller.deleteProjectDetail);
router.post('/editproject_detail/:id',controller.editProjectDetail);


module.exports = router;
