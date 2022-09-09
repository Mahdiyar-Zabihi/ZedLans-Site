const path=require('path');

module.exports=Object.freeze({
    isDebug:true,
    port:Number.parseInt(process.env.PORT) || 3000,
    logFileName:path.resolve(__dirname,'LogFile.log').trim(),
    publicPath:path.resolve(__dirname,'Public').trim(),

    viewsPath:path.resolve(__dirname,'Views').trim(),
    viewEngineName:'ejs',

    reqLimit:{
        count:40,
        time:2*(60*1000),
        msg:'تعداد درخواست های ارسالی شما از حد تایین شده عبور کرده است. لطفا مدتی صبر کنید',
    },
});