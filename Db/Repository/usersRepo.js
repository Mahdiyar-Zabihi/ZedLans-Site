const _UsrMdl=new WeakMap();
const currentModelPath='./../Models/userModel';
const WorkRepoModules=require('./modulesRepo');

class WorkUsers{
    constructor(){
        _UsrMdl.set(this,require(currentModelPath));
        
        this.Getters=Object.freeze({
            all:this.Get_AllUsers.bind(this),
            byId:this.Get_UserById.bind(this),
            byName:this.Get_UserByName.bind(this),
            byCustom:this.Get_UserByCustom.bind(this),
            byUsername:this.Get_UserIdByUserName.bind(this),
        });
        this.Deleters=Object.freeze({
            all:this.Delete_All.bind(this),
            single:this.Delete_User.bind(this),
        });
        this.Repetitive=Object.freeze({
            byEmail:this.isUserRepetitiveByEmail.bind(this),
            byFullName:this.isUserRepetitiveByName.bind(this),
            byPhoneNum:this.isUserRepetitiveByPhone.bind(this),
            byUsername:this.isUserRepetitiveByUserName.bind(this),
            byPassword:this.isUserRepetitiveByPassword.bind(this),
        });
        this.More=Object.freeze({
            new:this.createNewUser.bind(this),
            count:this.usersCounter.bind(this),
        });
        Object.freeze(this);
    }

    async createNewUser(userName,email,password){
        try{
            userName=WorkRepoModules.spliter(WorkRepoModules.mongoInjctCleaner(userName.trim()));
            email=WorkRepoModules.mongoInjctCleaner(email.trim());
            if(!await this.Repetitive.byUsername(userName) && !await this.Repetitive.byEmail(email)){
                password=WorkRepoModules.Hasher(WorkRepoModules.mongoInjctCleaner(password));
                const newUser=_UsrMdl.get(this)({
                    UserName:userName,
                    RegCode:WorkRepoModules.registerCode(),
                    PassWord:password,
                    Email:email,
                    IsAdmin:false,
                    RegTime:Date.now(),
                });
                await newUser.save();
                return [true,newUser];
            }else{return [false,true];}}catch{return [false,false];}
    }

    async Delete_User(username,userId){
        try{
            username=WorkRepoModules.spliter(WorkRepoModules.mongoInjctCleaner(username));
            userId=WorkRepoModules.spliter(WorkRepoModules.mongoInjctCleaner(userId));
            await _UsrMdl.get(this).deleteOne({UserName:username,_id:userId});
            return true;
        }catch{return false;}
    }

    async Delete_All(){
        try{
            await _UsrMdl.get(this).deleteMany({});
            return true;
        }catch{return false;}
    }

    async usersCounter(){
        try{return await _UsrMdl.get(this).find({}).count();
        }catch{return false;}
    }


    async isUserRepetitiveByUserName(username){
        const user=await _UsrMdl.get(this).findOne({UserName:WorkRepoModules.mongoInjctCleaner(username)});
        if(user) return [true,user];else return false;}
    async isUserRepetitiveByPassword(password){
        const user=await _UsrMdl.get(this).findOne({Password:WorkRepoModules.mongoInjctCleaner(password)});
        if(user) return [true,user];else return false;}
    async isUserRepetitiveByPhone(phoneNum){
        const user=await _UsrMdl.get(this).findOne({PhoneNum:WorkRepoModules.mongoInjctCleaner(phoneNum)});
        if(user) return [true,user];else return false;}
    async isUserRepetitiveByName(fullName){
        const user=await _UsrMdl.get(this).findOne({Name:WorkRepoModules.mongoInjctCleaner(fullName)});
        if(user) return [true,user];else return false;}
    async isUserRepetitiveByEmail(email){
        const user=await _UsrMdl.get(this).findOne({Email:WorkRepoModules.mongoInjctCleaner(email)});
        if(user) return [true,user];else return false;}


    async Get_AllUsers(Limit){
        try{
            Limit=WorkRepoModules.InjctCleaner(Limit);
            if(Limit){
                const Users=await _UsrMdl.get(this).find({}).limit(Limit).sort({RegTime:1,IsAdmin:1,UserName:1});
                return Users;
            }
            const Users=await _UsrMdl.get(this).find().sort({IsAdmin:1,RegTime:1,UserName:1});
            return Users;
        }catch{return false;}
    }
    async Get_UserByName(UserName){
        try{
            UserName=WorkRepoModules.InjctCleaner(UserName);
            const User=await _UsrMdl.get(this).findOne({UserName:UserName});
            return User;
        }catch{return false;}
    }

    async Get_UserByCustom(CustomObj){
        try{
            CustomObj=WorkRepoModules.InjctCleaner(CustomObj);
            const User=await _UsrMdl.get(this).findOne(CustomObj);
            return User;
        }catch{return false;}
    }

    async Get_UserById(UserId){
        try{
            UserId=WorkRepoModules.InjctCleaner(UserId);
            const User=await _UsrMdl.get(this).findById({_id:UserId});
            return User;
        }catch{return false;}
    }

    async Get_UserIdByUserName(username){
        try{
            username=WorkRepoModules.mongoInjctCleaner(username);
            const UserId=await _UsrMdl.get(this).findOne({UserName:username}).select({_id:1});
            return UserId._id;
        }catch{return false;}
    }
};

module.exports=new WorkUsers;