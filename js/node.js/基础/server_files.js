const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const pathLib=require('path');


var server=express();
server.listen(8080);
//这个不能用来处理文件类的数据
server.use(bodyParser.urlencoded({extended:false}));
server.use(multer({dest:"./www/upload"}).any());

server.post('/',function(req,res){
	console.log(req.files);
	//给上传的文件重命名
	var newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;
	fs.rename(req.files[0].path,newName,function(err){
		if(err){
			res.send("上传失败");
		}else{
			res.send("上传成功");
		}
	});
	console.log(req.files);
});