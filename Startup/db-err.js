const mongoDBClient=require('mongoose');
const winston=require('winston');

module.exports=(configObg)=>{
    winston.add(new winston.transports.File({filename:configObg.logFileName}));
    process.on('uncaughtException',excpt=>{winston.error(excpt.message,excpt);console.log(`\n Error : Uncaught-Exception  Occurred. See In : Root/${configObg.logFileName}`);setTimeout(()=>{process.exit(1);},100);});
    process.on('unhandledRejection',excpt=>{winston.error(excpt.message,excpt);console.log(`\n Error : UnHandled-Promise-Rejection  Occurred. See In : Root/${configObg.logFileName}`);setTimeout(()=>{process.exit(1);},100);});

    mongoDBClient.connect(process.env.MAINDB_URL,{authSource:'admin',})
        .then(()=>{console.log('\n DataBase Connected Successfully');})
        .catch(err=>{if(err)console.log('\n DataBase Connected Field');winston.error(err.message,err);});
};