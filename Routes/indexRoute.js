'use strict';
const express=require('express');
const expressRouter=express.Router();
const config=require('./../Config');
const UnitOfWork=require('./../Db/Repository/UnitOfWork');

//Base & Main Routes
expressRouter.get('/',(req,res)=>{res.render('Index');});
expressRouter.get('/home',(req,res)=>{res.render('Index');});
expressRouter.use('/Api',require('./Api/indexApi'));
expressRouter.use('/',require('./Auth/indexAuth'));
expressRouter.use('/',require('./Users/indexUsers'));
expressRouter.use('/Admin',require('./Admin/indexAdmin'));

//Err Handle Routes
expressRouter.all('*',(req,res,next)=>{
    try{
        const notFindErr=new Error(UnitOfWork.More.injctCleaner(req.url.slice(1).trim()));notFindErr.status=404;
        throw notFindErr;
    }
    catch(err){next(err);}
});
expressRouter.use((err,req,res,next)=>{
    if(err){
        let errStack=err.stack || '';errStack=UnitOfWork.More.xssInjectCleaner(errStack);
        let errCode=err.status || 500;errCode=UnitOfWork.More.xssInjectCleaner(errCode);
        let errMsg=err.message || 'خطای سمت سرور';errMsg=UnitOfWork.More.xssInjectCleaner(errMsg);
        if(errCode == 404){
            return res.status(404).render('Errs/404ErrPage',{Title:' یافت نشد',searchVal:errMsg});
        }
        if(config.isDebug){
            res.render('Errs/DevErrPage',{errCode,errMsg,errStack,Title:''});
        }else{
            res.status(500).render('Errs/500ErrPage',{Title:' خطای سمت سرور'});
        }
    }
});

module.exports=expressRouter;