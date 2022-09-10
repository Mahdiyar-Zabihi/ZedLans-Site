'use strict';
const CvRepo=require('./cvRepo');
const UsersRepo=require('./usersRepo');
const ModulesRepo=require('./modulesRepo');


class UnitOfWork{
    constructor(){
        this.Main=Object.freeze({
            Users:UsersRepo,
            Users_Cv:CvRepo,
        });
        this.More=Object.freeze(
            ModulesRepo,
        );
        Object.freeze(this);
    }
}


module.exports=new UnitOfWork();