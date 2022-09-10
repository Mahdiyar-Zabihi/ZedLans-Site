const express=require('express');
const expressRouter=express.Router();
const ProfController=require('./../../Controllers/userProfController');

expressRouter.get('/@:UserName',ProfController.index);

module.exports=expressRouter;