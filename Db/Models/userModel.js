const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UsersSchema=new Schema({
    PhoneNum:{type:Number,required:false},
    RegisterTime:{type:Date,required:true,default:Date.now},
    RegisterCode:{type:String,required:true},
    IsAdmin:{type:Boolean,required:true,default:false},
    Name:{type:String,required:false,},
    UserName:{type:String,required:true,minlength:3,maxlength:22},
    Password:{type:String,required:true,minlength:8},
    Email:{type:String,required:true},
});

const modelName='Users';
module.exports=mongoose.model(modelName,UsersSchema,modelName);