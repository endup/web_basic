const express=require('express');
const cookieParser=require('cookie-parser');

var server=express();
server.listen(8080);
//cookie
server.use(cookieParser('qwertyuiop'));
server.use('/',function(req,res){
	//��cookieǩ��,�Ŵ۸�
	req.secret="qwertyuiop";
	//дcookie
	//res.cookie('user','hello',{path:"/aaa",maxAge:1000*3600});
	res.cookie('user','today',{signed:true});
	//��ȡcookie
	console.log("ǩ������cookie",req.signedCookies);
	console.log("ûǩ����gookie",req.cookies);

	//ɾ��cookie
	res.clearCookie("user");
	res.send('ok');
});