const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
const mysql=require('mysql');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');

const oMulter=multer({dest:'./static/upload'});
//const createRouter=require('./route/1.js');
var server=express();
server.listen(8080);

//1.获取请求数据
server.use(bodyParser.urlencoded());
server.use(oMulter.any());
//2.cookie,session
server.use(cookieParser());
(function(){
  var keys=[];
  for(var i=0;i<100000;i++){
    keys[i]='a_'+Math.random();
  }
  server.use(cookieSession({
    name:'sess_id',
    keys:keys,
    maxAge:20*60*1000 //20mins
  }));
})();

//3.模板
server.engine('html',consolidate.ejs);
server.set('views','template');
server.set('view engine','html');
//4.route

//添加路由必须得用use添加
server.use('/',require('./route/web/web.js')());
server.use('/admin/',require('./route/admin/index.js')());



//5.default:static
server.use(static('./static/'));
