const express=require('express');

module.exports=function createRouter(){
  var router=express.Router();
  router.get('/',function(req,res){
    res.send("我是web").end();
  });
  return router;
}
