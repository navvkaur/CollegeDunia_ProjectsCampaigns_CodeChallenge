const express = require('express');
const router= express();
const controller = require('../Controllers/Subtask_Controller')

router.get('/mytask/landing/',controller.subpage);
router.post('/mytask/landing/clicked',controller.clicked);
router.get('/mytask/projectstats',controller.project_stats);



module.exports = router;