const bcrypt=require('bcryptjs');
const sanitizeCleaner=require('express-mongo-sanitize');
const xssClean=require('xss-clean/lib/xss').clean;

class WorkRepoModules{
    constructor(){Object.freeze(this);}

    mongoInjctCleaner(value){try{return sanitizeCleaner.sanitize(value,{allowDots:true,replaceWith:'-',});}catch{return false;}}

    spliter(value,splitWith=' ',changeWith='-'){try{return this.mongoInjctCleaner(value).split(splitWith).join(changeWith);}catch{return false;}}
    
    unSpliter(value,unValue='-',unChange=' '){try{return this.mongoInjctCleaner(value).split(unValue).join(unChange);}catch{return false;}}

    hashCompare(fristVal,secondVal){try{return bcrypt.compareSync(fristVal.toString(),secondVal.toString());}catch{return false;}}
    
    hasher(value,hashSalt=8){try{return bcrypt.hashSync(this.mongoInjctCleaner(value),Number.parseInt(hashSalt));}catch{return false;}}

    xssInjectCleaner(value){try{return xssClean(this.mongoInjctCleaner(value));}catch{return false;}}
    
    registerCode(){try{const chars='sXHuvM^?!7Y&xyJnS0iU:<FGKN8=[C$2c,.B)_@6]{jk1AT%gh9#DtOP*baQ4(lm|WZI3Vo-R+qrEz>/}p;wLdef';const charLength=chars.length;const nums=[Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength),Math.floor(Math.random()*charLength)];let GUP='';for(const I of nums){if(GUP.includes(chars[I])){GUP+=chars[Math.floor(Math.random()*charLength)];}else{GUP+=chars[I];};};return GUP;}catch{return false;}}
}


module.exports=new WorkRepoModules;