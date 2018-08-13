function minimizeMaximize(elementID)
{
	element = document.getElementById(elementID);
	plusMinus = document.getElementById(elementID + "-plusMinus");
	
	if(element.style.display != "block")
	{
		element.style.display = "block";
		plusMinus.src = "img/minus.gif";
	}
	else
	{
		element.style.display = "none";
		plusMinus.src = "img/plus.gif";
	}
}