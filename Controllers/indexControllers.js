'use strict';
const autoBind=require('auto-bind');
class MainConroller{
    constructor(){
        autoBind(this);
    }
};

module.exports=MainConroller;