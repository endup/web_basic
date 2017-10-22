<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>敏感词过滤</title>
  <script type="text/javascript">
	window.onload=function(){
			var oTxt1=document.getElementById('txt1');
			var oTxt2=document.getElementById('txt2');
			var oBtn1=document.getElementById('btn1');
			btn1.onclick=function(){
				//var re1=/a|b|c|d|e/gi;
				var re2=/<[^<>]+>/g;
					//oTxt2.value=oTxt1.value.replace(re1,'*');
					oTxt2.value=oTxt1.value.replace(re2,'');
			}
	}
  </script>
 </head>
 <body>
	<textarea id="txt1" rows="10" cols="40"></textarea><br>
	<input type="button" id="btn1" value="过滤"><br>
   <textarea id="txt2" rows="10" cols="40"></textarea><br>
 </body>
</html>
