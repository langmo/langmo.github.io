var requestURL = "https://langmo.github.io/publications.list";
var publications = null;
function queryPublications(callback)
{
	if(publications != null)
	{
		callback(publications);
		return;
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET', requestURL);
	xhr.onreadystatechange = function ()
	{
		if(xhr.readyState === 4)
		{
			if(xhr.status === 200 || xhr.status == 0)
			{
				publications = JSON.parse(xhr.responseText);
				callback(publications);				
			}
		}
	}
	xhr.send(null);
	return;
}
var pubTypes = [
	{
		"id": "regular",
		"name": "Regular Papers"
	},
	{
		"id": "conference",
		"name": "Conference Papers"
	},
	{
		"id": "bookchapter",
		"name": "Book Chapters"
	},
	{
		"id": "phdthesis",
		"name": "PHD Thesis"
	}
];
function createPublications(publications, parentElementID)
{
	var parentElement = document.getElementById(parentElementID);
	while(parentElement.firstChild) 
	{
		parentElement.removeChild(parentElement.firstChild);
	}
	for(var i=0; i<pubTypes.length; i++)
	{
		createPublicationsType(publications, pubTypes[i], parentElement)
	}
}
function createPublicationsType(publications, pubType, parentElement)
{
	var headerElement = document.createElement("h2");
	headerElement.innerHTML = pubType.name;
	parentElement.appendChild(headerElement);
	var listElement = document.createElement("ul");
	for(var i=0; i<publications.length; i++)
	{
		if(publications[i].type == pubType.id)
		{
			publicationElement = document.createElement("li");
			createPublication(publications[i], publicationElement);	
			listElement.appendChild(publicationElement);	
		}
	}		
	parentElement.appendChild(listElement);		
}
function createPublication(publication, publicationElement)
{
	var mainElement = document.createElement("p");
	var names = "";
	if(publication.authors.length == 1)
	{
		names = unescape(publication.authors[0])+" ";
	}
	else
	{
		for(var i=0; i<publication.authors.length; i++)
		{
				if(i<publication.authors.length-1)
					names += unescape(publication.authors[i]) + ", ";
				else
					names += "and " + unescape(publication.authors[i])+" ";
		}
	}
	var namesElement = document.createTextNode(names);
	mainElement.appendChild(namesElement);
	mainElement.appendChild(document.createTextNode("("+publication.year+"). "));
	mainElement.appendChild(document.createTextNode("\""+unescape(publication.title)+".\" "));
	var sourceElement = document.createElement("i");
	sourceElement.appendChild(document.createTextNode(unescape(publication.source)));
	mainElement.appendChild(sourceElement);
	mainElement.appendChild(document.createTextNode(", "+unescape(publication.location)+"."));
	mainElement.appendChild(document.createElement("br"));
	publicationElement.appendChild(mainElement);
	
	var bottomElement = document.createElement("p");
	bottomElement.textAlign = "right";
	if(publication.url)
	{
		var viewElement = document.createElement("a");
		viewElement.href=publication.url;
		viewElement.target="_blank";
		viewElement.appendChild(document.createTextNode("link"));
		bottomElement.appendChild(viewElement);
	}
	if(publication.download)
	{
		if(bottomElement.hasChildNodes())
			bottomElement.appendChild(document.createTextNode(" | "));
		var viewElement = document.createElement("a");
		viewElement.href=publication.download;
		viewElement.target="_blank";
		viewElement.appendChild(document.createTextNode("download"));
		bottomElement.appendChild(viewElement);
	}
	publicationElement.appendChild(bottomElement);
}