const express=require('express');
const bodyParser=require('body-parser');

var server=express();
server.listen(8080);


server.use(bodyParser.urlencoded({//��body-parseģ��������,Ȼ�������req.query
	entended:true,//�Ƿ�������չģʽ
	limit:2*1024*1024 //�������ݴ�С
}));
//get,post
server.use('/',function(req,res){
	console.log(req.query);//��ȡget�ύ������
	console.log(req.body);//��ȡpost�ύ������
});