const fs=require('fs');
const http=require('http');

//����������
var server=http.createServer(function(req,res){
	var file_name='./www'+req.url;

	fs.readFile(file_name,function(err,data){
		if(err){
			res.write('û�и�ҳ��');
		}else{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
		}
		res.end();
	});
});

server.listen(8080);
/*
//��ȡ�ļ�����(�ļ������ص�����(�����ʶ������))
fs.readFile('a.txt',function(err,data){
	if(err){
		console.log('read failed');
	}else{
		console.log(data.toString());
	}
});
//д�ļ�(�ļ��������ݣ��ص�����)
fs.writeFile('b.txt',"hello world",function(err){
	console.log(err);
});*/