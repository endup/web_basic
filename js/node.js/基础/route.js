const express=require('express');

var server=express();
server.listen(8080);

//创建路由
var routeUser=express.Router();
server.use('/user',routeUser);
routeUser.get('/1.html',function(req,res){
	res.send('user1');
});
routeUser.get('/2.html',function(req,res){
	res.send('user2');
});

var newRouter=express.Router();
server.use('/new',newRouter);
newRouter.get('/1.html',function(req,res){
	res.send('new1');
});
newRouter.get('/2.html',function(req,res){
	res.send('new2');
});