const http=require('http');
const queryString=require('querystring');


http.createServer(function(req,res){
	var str='';
	var i=0;
	//有post数据到达时调用  
	req.on('data',function(data){
		console.log("第"+i+++"次收到数据");
		str+=data;
	});
	//post数据全部到达时调用  
	req.on('data',function(){
		console.log(str);
		var post=queryString.parse(str);
		console.log(post);
	});
}).listen(8080);