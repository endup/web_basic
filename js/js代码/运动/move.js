
/*运动框架,startMove函数,startMove(obj,attr,iTarget)
obj为运动的对象,attr为运动的熟悉,iTarget为属性的最终结果*/
function getStyle(obj,attr){
			if(obj.currentStyle){
					return obj.curentStyle[attr];
			}else{
					return getComputedStyle(obj,false)[attr];
			}
	}

	function startMove(obj,attr,iTarget,fn){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
					var iCut=0;
					if(attr=='opacity'){
							iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
					}else{
							iCur=parseInt(getStyle(obj,attr));
					}
					var iSpeed=(iTarget-iCur)/8;
					iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
					if(iCur==iTarget){
							clearInterval(obj.timer);
							if(fn){
								fn();	
							}
					}else{
						if(attr=='opacity'){
									obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
									obj.style.opacity=(iCur+iSpeed)/100;
							}else{
									obj.style[attr]=iCur+iSpeed+"px";
							}
						
					}
			},30);
	}