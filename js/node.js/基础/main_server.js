const http=require('http');
const queryString=require('querystring');
const fs=require('fs');
const urlLib=require('url');

http.createServer(function(req,res){
	//get
	var obj=urlLib.parse(req.url,true);
	var url=obj.pathname;
	const GET=obj.query;
	//post
	var str="";
	req.on('data',function(data){
		str+=data;
	});
	req.on('end',function(data){
		const POST=queryString.parse(str);
		console.log(url,GET,POST);
	});
	//file
	var fileName='./www'+url;
	fs.readFile(fileName,function(err,data){
		if(err){
			res.write("404");
		}else{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
		}
		res.end();
	});
}).listen(8080);