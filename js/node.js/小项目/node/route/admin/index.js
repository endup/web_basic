const express=require('express');
const commom=require('../../libs/common');

module.exports=function createRouter(){
  var router=express.Router();
  //检查登录状态
  router.use((req,res,next)=>{
    if(!req.session['admin_id'] &&req.url!='/login'){//没有登录
      res.redirect('/admin/login');
    }else {
      next();
    }
  });
  router.use('/login',require('./login')());
  router.get('/',(req,res)=>{
    res.render('admin/index.ejs',{});
  });

  router.use('/banners',require('./banners')());
  router.use('/customs',require('./customs')());
  return router;
};
