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
		"id": "thesis",
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
	var names = "";
	if(publication.authors.length == 1)
	{
		names = publication.authors[0];
	}
	else
	{
		for(var i=0; i<publication.authors.length; i++)
		{
				if(i<publication.authors.length-1)
					names += publication.authors[i] + ", ";
				else
					names += "and " + publication.authors[i]+" ";
		}
	}
	var namesElement = document.createTextNode(names);
	publicationElement.appendChild(namesElement);
	publicationElement.appendChild(document.createTextNode("("+publication.year+"). "));
	publicationElement.appendChild(document.createTextNode("\""+publication.title+"\"."));
	var sourceElement = document.createElement("i");
	sourceElement.appendChild(document.createTextNode(publication.source));
	publicationElement.appendChild(sourceElement);
	publicationElement.appendChild(document.createTextNode(", "+publication.location));
	publicationElement.appendChild(document.createElement("br"));
}