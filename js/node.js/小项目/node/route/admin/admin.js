const express=require('express');
const commom=require('../../libs/common');
const mysql=require('mysql');

const db=mysql.createPool({host:'localhost',user:'root',password:'123456',database:'learner'});

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
  router.get('/login',(req,res)=>{
        res.render("admin/login.ejs",{});
  });
  router.post('/login',function(req,res){
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

  router.get('/',(req,res)=>{
    res.render('admin/index.ejs',{});
  });

  router.get('/banners',(req,res)=>{
    //检测要执行的操作
    switch (req.query.act) {
        case 'mod':
        db.query(`select * from banner_table where ID=${req.query.id}`,(err,data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else if(data.length==0){
            res.status(404 ).send('data not found').end();
          }else {
            //载入全部数据
            db.query(`select * from banner_table`,(err,banners)=>{
               if(err){
                 console.error(err);
                 res.status(500).send('database error').end();
               }else {
                 res.render('admin/banners.ejs',{banners,mod_data:data[0]});
               }
             });

          }
        });
        break;
        case 'del':
          db.query(`delete from banner_table where ID=${req.query.id}`,(err,data)=>{
            if(err){
              console.error(err);
              res.status(500).send('database error').end();
            }else {
              res.redirect('/admin/banners');
            }
          });
        break;
        default:
        //获取数据库的数据
          db.query(`select * from banner_table`,(err,banners)=>{
             if(err){
               console.error(err);
               res.status(500).send('database error').end();
             }else {
               res.render('admin/banners.ejs',{banners});
             }
           });
        break;

    }
});

  router.post('/banners',(req,res)=>{

    var title=req.body.title;
    var description=req.body.description;
    var href=req.body.href;
    if(!title || !description ||!href){
      res.status(400).send('arg err').end();
    }else {

      //判断执行操作类型
      if(req.body.mod_id){//修改
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        //应该是sql语句错了





        
        db.query(`update banner_table set \
          title='${req.body.title}'\
          description='${req.body.description}'\
          href='${req.body.href}'\
          where ID=${req.body.mod_id}`);
      }else {             //添加
        db.query(`insert into banner_table (title,description,href)
         value('${title}','${description}','${href}')`,(err,data)=>{
           if(err){
             console.error(err);
             res.status(500).send('database error').end();
           }else {
             res.redirect('/admin/banners');
           }
         });
      }
    }
  });
  return router;
};
