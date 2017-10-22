const fs=require('fs');
const http=require('http');

//建立服务器
var server=http.createServer(function(req,res){
	var file_name='./www'+req.url;

	fs.readFile(file_name,function(err,data){
		if(err){
			res.write('没有该页面');
		}else{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
		}
		res.end();
	});
});

server.listen(8080);
/*
//读取文件内容(文件名，回掉函数(错误标识，内容))
fs.readFile('a.txt',function(err,data){
	if(err){
		console.log('read failed');
	}else{
		console.log(data.toString());
	}
});
//写文件(文件名，内容，回掉函数)
fs.writeFile('b.txt',"hello world",function(err){
	console.log(err);
});*/