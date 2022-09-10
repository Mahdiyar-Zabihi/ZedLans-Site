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


//Runnig
const runValues=Object.freeze({
    port:config.port || 3000,
    mode:config.isDebug,
});
app.listen(runValues.port,err=>{console.log(`\n Run-Mode : ${runValues.mode?'Debug':'Deploy'}.`);if(err) console.log(`\n Run Field On Port : ${runValues.port}.`); else{console.log(`\n Run Successfully On Port : ${runValues.port}.`);}});