function myAddEvent(obj,sEv,fn){
		if(obj.attachEvent){
				obj.attachEvent('on'+sEv,fn);
		}else{
				obj.addEventListener(sEv,fn,false);
		}
}

//获取指定class的元素,仿佛不太好
function getByClass(oParent,sClass){
		var aEle=oParent.getElementsByTagName('*');
		var aResult=[];
		for(var i=0,len=aEle.length;i<len;i++){
				if(aEle[i].className==sClass){
						aResult.push(aEle[i]);
				}
		}
		return aResult;
}
//为了调用方便
function $(vArg){
		return new VQuery(vArg);
}
 
 function VQuery(vArg){
	 //用来保存选中的元素
	 this.elements=[];
		switch(typeof vArg){
				case 'function' :
					//window.onload=vArg;
					myAddEvent(window,'load',vArg);
					break;
				case 'string':
						switch(vArg.charAt(0)){
								case '#':	//ID
									var obj=document.getElementById(vArg.substring(1));
									this.elements.push(obj);
									break;
								case '.':	//class
									this.elements=document.getElementsByClassName(vArg.substring(1));
									//this.elements=getByClass(document,vArg.substring(1));
									break;
								default:	//tagName
									this.elements=document.getElementsByTagName(vArg);
									break;
						}
					break;
				case 'object':
					this.elements.push(vArg);
					break;
		}
}
//控制样式
VQuery.prototype.css=function(attr,value){
		for(var i=0,len=this.elements.length;i<len;i++){
				myAddEvent(this.elements[i],'click',fn);
		}
}
//响应点击事件
VQuery.prototype.click=function(fn){
		if(arguments.length==2){
				for(var i=0,len=this.elements.length;i<len;i++){
						this.elements[i].style[attr]=value;
				}
		}else{//获取样式
				return this.elements[0].style[attr];
				//return getStyle(this.elements[0],attr);
		}
}
//响应点击事件2
VQuery.prototype.toggle=function(){
	var _arguments=arguments;
		for(var i=0,len=this.elements.length;i<len;i++){
				addToggle(this.elements[i]);
		}
		function addToggle(obj){
				var flag=0;
				myAddEvent(obj,'click',function(){
						_arguments[flag++%_arguments.length].call(obj);
				});
		}
}
//获取相应下标的元素
VQuery.prototype.eq=function(n){
		return $(this.elements[n]);
}
//获取子元素
VQuery.prototype.find=function(str){
	var aResult=[];
		for(var i=0,len=this.elements.length;i<len;i++){
				switch(str.charAt(0)){
					case '.'://class
						var aEle=document.getElementsByClassName(str..substring(1));
						aResult=aResult.concat(aEle);
						break;
					default://id
						this.elements[i].getElementsByTagName(str);
						aResult=aResult.concat(aEle);
						break;
				}
		}
}

//响应hover
VQuery.prototype.hover=function(fnOver,fnOut){
		for(var i=0,len=this.elements.length;i<len;i++){
				myAddEvent(this.elements[i],'mouseover',fnOver);
				myAddEvent(this.elements[i],'mouseout',fnOut);
		}
}


VQuery.prototype.show=function(fn){
		for(var i=0,len=this.elements.length;i<len;i++){
				this.elements[i].style.display='block';
		}
}
VQuery.prototype.hide=function(fn){
		for(var i=0,len=this.elements.length;i<len;i++){
				this.elements[i].style.display='none';
		}
}