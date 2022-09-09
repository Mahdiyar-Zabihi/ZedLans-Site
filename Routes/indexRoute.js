'use strict';
const express=require('express');
const expressRouter=express.Router();
const config=require('./../Config');


expressRouter.get('/',(req,res)=>{res.render('Index');});
expressRouter.get('/home',(req,res)=>{res.render('Index');});


expressRouter.all('*',(req,res,next)=>{
    try{
        const ntSearchVal=req.url.slice(1).trim();
        let err=new Error(ntSearchVal);
        err.status=404;
        throw err;
    }catch(err){next(err);}
});
expressRouter.use((err,req,res,next)=>{
    if(err){
        const errCode=err.status || 500;
        const errMsg=err.message || 'خطای سمت سرور';
        const stack=err.stack || '';
        if(errCode === 404){
            return res.status(404).render('Errs/404ErrPage',{Title:' یافت نشد',searchVal:errMsg});
        }
        if(config.isDebug){
            res.render('ErrsView/DevErrPage',{errCode,errMsg,stack,Title:''});
        }else{
            res.status(500).render('ErrsView/500ErrPage',{Title:' خطای سمت سرور'});
        }
    }
});


module.exports=expressRouter;