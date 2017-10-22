const express=require('express');
const bodyParser=require('body-parser');

var server=express();
server.listen(8080);


server.use(bodyParser.urlencoded({//用body-parse模块来过渡,然后就能用req.query
	entended:true,//是否设置扩展模式
	limit:2*1024*1024 //现在数据大小
}));
//get,post
server.use('/',function(req,res){
	console.log(req.query);//获取get提交的数据
	console.log(req.body);//获取post提交的数据
});