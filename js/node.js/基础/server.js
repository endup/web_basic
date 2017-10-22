const express=require('express');
const static=require("express-static");
const cookieParser=require("cookie-parser");
const cookieSession=require("cookie-session");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const jade=require("jade");

var server=express();
server.listen(8080);

//1.����gookie
server.use(cookieParser('qwertyuioodfdsffajakl'));
//2.ʹ��session
var arr=[];
for(var i=0;i<100000;i++){
	arr.push('keys_'+Math.random());
}
server.use(cookieSession({name:'session_id',keys:arr,maxAge:20*60*1000}));
//3.post����
server.use(bodyParser.urlencoded({extended:false}));
//�����û�����
server.use('/',function(req,res,next){
	console.log(req.query,req.body,req.cookie,req.session);
});
//4.static����
server.use(static('./www'));