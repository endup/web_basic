const express=require('express');
const static=require("express-static");
const cookieParser=require("cookie-parser");
const cookieSession=require("cookie-session");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const jade=require("jade");
const consolidate=require('consolidate');

var server=express();
server.listen(8080);

//1.����gookie
server.use(cookieParser('qwertyuioodfdsffajakl'));
//2.ʹ��session
var arr=[];
for(var i=0;i<100000;i++){
	arr.push('keys_'+Math.random());
}
server.use(cookieSession({name:'session_id',keys:arr,maxAge:20*60*1000}));
//3.post����
server.use(bodyParser.urlencoded({extended:false}));
//�����û�����
server.get('/index',function(req,res){
	//console.log(req.query,req.body,req.cookie,req.session);
	res.render('1.ejs');
});
//5.����ģ������
//���ʲô
server.set('view engine','html');
//ģ���ļ�·��
server.set('views','./views');
//����ģ������
server.engine('html',consolidate.ejs);

//4.static����
server.use(static('./www'));