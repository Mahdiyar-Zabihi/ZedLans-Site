'use strict';
//Packages & Files
require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const config=require('./Config');
const allRoutes=require('./Routes/indexRoute');


//Variables
global.config=config;
const app=express();


//Middlewares & Connections
require('./Startup/db-err')(config,mongoose);
require('./Startup/middlewares')(express,app,config);
app.use('/',allRoutes);


//Running
const runValues=Object.freeze({
    port:config.port || 3000,
    mode:config.isDebug,
});
app.listen(runValues.port,err=>{if(err) console.log(`\n Run Field On Port : ${runValues.port}. Run-Mode : ${runValues.mode?'Debug':'Deploy'}`);else{console.log(`\n Run Successfully On Port : ${runValues.port}. Run-Mode : ${runValues.mode?'Debug':'Deploy'}`);}});