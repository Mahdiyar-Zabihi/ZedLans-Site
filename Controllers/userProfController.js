'use strict';
const MainConroller=require('./indexControllers');
const UnitOfWork=require('./../Db/Repository/UnitOfWork');

class UsersController extends MainConroller{
    async index(req,res,next){
        try{
            const currentUserName=UnitOfWork.More.mongoInjctCleaner(UnitOfWork.More.spliter(req.params.UserName));
            const currentUser=await UnitOfWork.Main.Users.Getters.byUsername(currentUserName);
            if(currentUser){
                res.render('Users/Prof/indexProf',{CurrentUser:currentUser,});
            }else{
                res.render('Users/Prof/ntFindProf',{UserName:currentUserName,});
            }
        }catch(err){
            next(err);
        }
    }
}

module.exports=new UsersController;