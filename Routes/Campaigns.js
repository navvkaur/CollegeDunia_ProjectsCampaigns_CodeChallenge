const express = require('express');
const router= express();
const controller = require('../Controllers/Campaign_Controller')


router.post('/addcampaign_detail',controller.addCampaignDetail);
router.get('/getcampaign_detail',controller.getCampaignDetail);
router.delete('/deletecampaign_detail/:id',controller.deleteCampaignDetail);
router.post('/editcampaign_detail/:id',controller.editCampaignDetail);


module.exports = router;