//引入系统内置的模块
const http=require('http');
//创建服务,当有连接时返回回掉函数
//在console里面好像打不了中文
var server=http.createServer(function(request,response){
	//获取用户请求的目的url
	switch(request.url){
		case '/1.html':
			response.write('1.html');
		break;
		case '/2.html':
			response.write('1.html');
		break;
		default:
			response.write("404");
	}
	//console.log(request.url);
	response.write("welcome for your visited");
	response.end();
});

//监听,参数为端口
server.listen(8080);

