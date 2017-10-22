const ejs=require('ejs');
const fs=require('fs');


var str=ejs.renderFile('./view/1.ejs',{name:"hello"},function(err,data){
	console.log(data);
});
