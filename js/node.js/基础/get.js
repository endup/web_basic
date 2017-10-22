const http=require('http');
//处理请求,如GET
const queryString=require('querystring');
//处理url
const urlLib=require('url');

var server=http.createServer(function(req,res){
	//通过req来获得前台请求的数据
	//console.log(req.url);
	var GET={};
	var url='';
	//判断是否有进行get请求
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
		//第二个参数中的true表示解析请求，不加表示不解析
		//这个可以不用判断是否有请求
		var obj=urlLib.parse(req.url,true);
		url=obj.pathname;
		GET=obj.query;
	}else{
		url=req.url;
	}
	

	console.log(url,GET);
}).listen(8080);