const express=require('express');
const mysql=require('mysql');
const commom=require('../../libs/common');
const db=mysql.createPool({host:'localhost',user:'root',password:'123456',database:'learner'});

  module.exports=function(){
    var router=express.Router();

  router.get('/',(req,res)=>{
        res.render("admin/login.ejs",{});
  });
  router.post('/',function(req,res){
    var username=req.body.username;
    var password=commom.md5(req.body.password);

    var str=`select * from admin_table where username='${username}'`;
    db.query(str,
      (err,data)=>{
        if(err){

          res.status(500).send('database error').end();
        }else{
          if(data.length==0){

            res.status(400).send("admin wrong").end();
          }else{
            if(data[0].password==password){
              //有此管理员,允许登录
              req.session['admin_id']=data[0].ID;
              res.redirect('/admin/');
            }else{
              res.status(404).send('password error').end();
            }
          }
        }
      });
  });
  return router;
};
