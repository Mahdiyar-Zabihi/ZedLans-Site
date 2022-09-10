const express=require('express');
const expressRouter=express.Router();

expressRouter.use('/Panel',require('./usersPanel'));
expressRouter.use('/',require('./usersProf'));

module.exports=expressRouter;