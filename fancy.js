var objec;
var clanID;

function search()
{

	var input = document.getElementById("searchTxt").value;
	var outputArea = document.getElementById("holder");
	var outputText = "";
	console.log(input);

	fetch('https://api.worldofwarships.com/wows/clans/list/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&search=' + input)
	.then(response => response.json())
	.then(data => 
	{
		objec = data;
		//console.log(objec);
		//console.log(typeof(objec));
		console.log(objec.data);
		//console.log(objec.data[0]);
		//console.log(objec.data[0].clan_id + ", " + objec.data[0].name);
		outputText += ("Tag: [" + objec.data[0].tag + "] <br>");
		outputText += ("Name: " + objec.data[0].name + '<br>');
		outputText += ("ID: " + objec.data[0].clan_id+ '<br>');
		clanID = objec.data[0].clan_id;
		return clanID;
	})
	.then(clanID =>
	{
		fetch('https://api.worldofwarships.com/wows/clans/info/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&clan_id=' + clanID)
		.then(response => response.json())
		.then(data =>
		{
			var detail = data;
			console.log(detail.data[clanID]);
			outputText += ("Created by: " + detail.data[clanID].creator_name + "<br>");
			outputText += ("Current Commander: " + detail.data[clanID].leader_name + "<br>");
			outputText += ("Description: " + detail.data[clanID].description + "<br>");
			outputArea.innerHTML = outputText;
		})
	})

}




