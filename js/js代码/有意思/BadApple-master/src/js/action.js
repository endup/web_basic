var player;
var tracker;

function show()
{
	var i=0;
	$("music").play(); 

	player = setInterval(
		function()
		{
			$("show").innerHTML = ac[i++];
		},
		33
	);
	
	tracker = setTimeout(
		function()
		{
			stop();
		}
		,218800
	);

	$("startCont").style.display = "none";
	$("stopCont").style.display = "block";
}

function stop()
{
	$("music").currentTime = 0;
	$("music").pause();
	clearInterval(player);
	clearTimeout(tracker);

	$("show").innerHTML = ac[0];
				
	$("startCont").style.display = "block";
	$("stopCont").style.display = "none";
}

function init()
{
	$("show").innerHTML = ac[0];

	$("startCont").style.display = "block";
	$("waitCont").style.display = "none";
}

function $(obj)
{
	return document.getElementById(obj);
}

$("startCont").style.display = "none";
$("stopCont").style.display = "none";

window.onload = init;
