const hpp=require('hpp');
const helmet=require('helmet');
const passport=require('passport');
const xssClean=require('xss-clean');
const MongoStore=require('connect-mongo');
const cookieParser=require('cookie-parser');
const connectFlash=require('connect-flash');
const expressSession=require('express-session');
const reqRateLimit=require('express-rate-limit');
const mongoSanitize=require('express-mongo-sanitize');

module.exports=(expressServer,expressApp,configObg)=>{
    expressApp.use(xssClean());
    expressApp.use(helmet());
    expressApp.use(hpp());
    expressApp.disable('x-powered-by');

    expressApp.use(expressServer.static(configObg.publicPath));
    expressApp.use(expressServer.urlencoded({extended:false}));
    expressApp.use(expressServer.json());

    expressApp.use(mongoSanitize());
    const reqRateLimitOptions=reqRateLimit.rateLimit({windowMs:configObg.reqLimit.time,max:configObg.reqLimit.count,message:configObg.reqLimit.msg,});
    expressApp.use(reqRateLimitOptions);

    expressApp.set('view engine',configObg.viewEngineName);
    expressApp.set('views',configObg.viewsPath);

    expressApp.use(cookieParser(process.env.COOKIE_SECRET));
    expressApp.use(expressSession({
        resave:true,saveUninitialized:true,
        secret:process.env.SESSION_SECRET,
        cookie:{
            httpOnly:true,
            expires:new Date(Date.now()+1000*3600*24*100),
        },
        store:MongoStore.create({mongoUrl:process.env.MAINDB_URL,},),
    }));
    expressApp.use(connectFlash());

    // require('./../passport/passport-local');
    // expressApp.use(passport.initialize());
    // expressApp.use(passport.session());

    expressApp.use((req,res,next)=>{
        res.locals.GlbVal={
            AuthenticateUser:req.user,
        };
        next();
    });
};