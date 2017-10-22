const express=require('express');
const mysql=require('mysql');
const commom=require('../../libs/common');
const pathLib=require('path');
const fs=require('fs');
const db=mysql.createPool({host:'localhost',user:'root',password:'123456',database:'learner'});

  module.exports=function(){
    var router=express.Router();

    router.get('/',(req,res)=>{
      //检测要执行的操作
      switch (req.query.act) {
          case 'mod':
          db.query(`select * from custom_evaluation_table where ID=${req.query.id}`,(err,data)=>{
            if(err){
              console.error(err);
              res.status(500).send('database error').end();
            }else if(data.length==0){
              res.status(404 ).send('data not found').end();
            }else {
              //载入全部数据
              db.query(`select * from custom_evaluation_table`,(err,evoluation)=>{
                 if(err){
                   console.error(err);
                   res.status(500).send('database error').end();
                 }else {
                   res.render('admin/customs.ejs',{evoluation,mod_data:data[0]});
                 }
               });
            }
          });
          break;
          case 'del':
          //删除文件
          db.query(`select * from custom_evaluation_table`,(err,data)=>{
             if(err){
               console.error(err);
               res.status(500).send('database error').end();
             }else {
               if(data.length==0){
                 res.status(404).send('custom evoluation missed').end();
               }else {
                 fs.unlink('static/upload/'+data[0].src,(err)=>{
                   if(err){
                     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                     console.log(err);
                     res.status(500).send('file operation error').end();
                   }else {
                     //删除数据库数据
                      db.query(`delete from custom_evaluation_table where ID=${req.query.id}`,(err,data)=>{
                        if(err){
                          console.error(err);
                          res.status(500).send('database error').end();
                        }else {
                          res.redirect('/admin/customs');
                        }
                      });
                   }
                 });
               }
             }
           });
          break;
          default:
          //获取数据库的数据
            db.query(`select * from custom_evaluation_table`,(err,evoluation)=>{
               if(err){
                 console.error(err);
                 res.status(500).send('database error').end();
               }else {
                 res.render('admin/customs.ejs',{evoluation});
               }
             });
          break;

      }
  });
  router.post('/',(req,res)=>{

    var title=req.body.title;
    var description=req.body.description;

    //有再上传头像
    if(req.files[0]){
      var oldPath=req.files[0].path;
      var ext=pathLib.parse(req.files[0].originalname).ext;
      var newPath=req.files[0].path+ext;
      var newFileName=req.files[0].filename+ext;
    }else {
      var newFileName=null;
    }


    fs.rename(oldPath,newPath,(err)=>{
      if(err){
        res.status(500).send("file upload error").end();
      }else {
        //有上传头像
        if(!title || !description){
          res.status(400).send('arg err').end();
        }else {
          //判断执行操作类型
          if(req.body.mod_id){//修改
            var str=`update custom_evaluation_table set \
              title='${req.body.title}',\
              description='${req.body.description}',\
              src='${req.body.src}'\
              where ID=${req.body.mod_id}`;
              //console.log(str);
            db.query(str,(err,data)=>{
              if(err){
                console.error(err);
                res.status(500).send('database error').end();
              }else {
                res.redirect('/admin/customs');
              }
            });
          }else {             //添加
            db.query(`insert into custom_evaluation_table (title,description,src)
             value('${title}','${description}','${newFileName}')`,(err,data)=>{
               if(err){
                 console.error(err);
                 res.status(500).send('database error').end();
               }else {
                 res.redirect('/admin/customs');
               }
             });
          }
        }
      }
    });
  });
  return router;
};
