const express=require('express');
const queryString=require("querystring");

var server=express();
server.listen(8080);

server.use(function(req,res,next){
	var str='';
	req.on('data',function(data){
		str+=data;
	});
	req.on('end',function(){
		req.body=queryString.parse(str);
		next();   //实现链式，调用下一个use
	});

});
server.use('/',function(req,res){
	console.log(req.body);
});
/*
server.use('/',function(req,res,next){
	console.log("a");
	next();   //实现链式，调用下一个use
});
server.use('/',function(req,res,next){
	console.log("b");
});*/