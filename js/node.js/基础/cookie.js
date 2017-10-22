const express=require('express');
const cookieParser=require('cookie-parser');

var server=express();
server.listen(8080);
//cookie
server.use(cookieParser('qwertyuiop'));
server.use('/',function(req,res){
	//对cookie签名,放篡改
	req.secret="qwertyuiop";
	//写cookie
	//res.cookie('user','hello',{path:"/aaa",maxAge:1000*3600});
	res.cookie('user','today',{signed:true});
	//读取cookie
	console.log("签名过的cookie",req.signedCookies);
	console.log("没签名的gookie",req.cookies);

	//删除cookie
	res.clearCookie("user");
	res.send('ok');
});