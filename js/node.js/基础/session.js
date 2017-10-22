const express=require('express');
const cookieParser=require('cookie-parser');
const cookieSession=require("cookie-session");

var server=express();



server.listen(8080);
//cookie
server.use(cookieParser());
//cookie���ɵ�session
server.use(cookieSession({
	name:'sessfa',
	maxAge:3600*1000,
	//sessionҪ�õ���key
	keys:["aaa","bbb","ccc"]
}));
server.use('/',function(req,res){
	if(req.session['count']==null){
		req.session['count']=1;
	}else{
		req.session['count']++;
	}

	console.log(req.session['count']);
	res.send('ok');
});