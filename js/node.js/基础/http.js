//����ϵͳ���õ�ģ��
const http=require('http');
//��������,��������ʱ���ػص�����
//��console��������������
var server=http.createServer(function(request,response){
	//��ȡ�û������Ŀ��url
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

//����,����Ϊ�˿�
server.listen(8080);

