const jade=require('jade');
const fs=require('fs');
var str=jade.renderFile('./view/index.jade',{pretty:true});


//console.log(str);
fs.writeFile('./build/index.html',str,function(err){
	if(err){
		console.log("fail");
	}else{
		console.log("success");
	}
});