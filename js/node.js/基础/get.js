const http=require('http');
//��������,��GET
const queryString=require('querystring');
//����url
const urlLib=require('url');

var server=http.createServer(function(req,res){
	//ͨ��req�����ǰ̨���������
	//console.log(req.url);
	var GET={};
	var url='';
	//�ж��Ƿ��н���get����
	if(req.url.indexOf('?')!=-1){
		
		//var arr1=req.url.split('?');
		//url=arr1[0];
		/*
		var arr2=arr1[1].split('&');
		for(var i=0,len=arr2.length;i<len;i++){
			var arr3=arr2[i].split('=');
			GET[arr3[0]]=arr3[1];
		}*/
		//GET=queryString.parse(arr1[1]);
		//�ڶ��������е�true��ʾ�������󣬲��ӱ�ʾ������
		//������Բ����ж��Ƿ�������
		var obj=urlLib.parse(req.url,true);
		url=obj.pathname;
		GET=obj.query;
	}else{
		url=req.url;
	}
	

	console.log(url,GET);
}).listen(8080);