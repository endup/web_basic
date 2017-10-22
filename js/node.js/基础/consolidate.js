const express=require('express');
const static=require("express-static");
const cookieParser=require("cookie-parser");
const cookieSession=require("cookie-session");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const jade=require("jade");
const consolidate=require('consolidate');

var server=express();
server.listen(8080);

//1.解析gookie
server.use(cookieParser('qwertyuioodfdsffajakl'));
//2.使用session
var arr=[];
for(var i=0;i<100000;i++){
	arr.push('keys_'+Math.random());
}
server.use(cookieSession({name:'session_id',keys:arr,maxAge:20*60*1000}));
//3.post数据
server.use(bodyParser.urlencoded({extended:false}));
//处理用户请求
server.get('/index',function(req,res){
	//console.log(req.query,req.body,req.cookie,req.session);
	res.render('1.ejs');
});
//5.配置模板引擎
//输出什么
server.set('view engine','html');
//模板文件路径
server.set('views','./views');
//哪种模板引擎
server.engine('html',consolidate.ejs);

//4.static数据
server.use(static('./www'));