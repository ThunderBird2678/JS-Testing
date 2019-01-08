var clanID;

function search()
{

	var input = document.getElementById("searchTxt").value;
	var outputArea = document.getElementById("holder");
	var outputText = "";
	console.log(input);

	// Set up a variable even earlier to store the Clan ID in
	var clanID;

	fetch('https://api.worldofwarships.com/wows/clans/list/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&search=' + input)
	.then
	(
		function(response)
		{
			return response.json();
		}
	)
	.then
	(
		function(data) 
		{
			// Set up a temporary object to store the JSON information in
			var objec = data;
			// I hate this syntax since WG used "data" as the keyword for clan info, but oh well
			console.log(objec.data);
			// Output the information to the screen
			outputText += ("Tag: [" + objec.data[0].tag + "] <br>");
			outputText += ("Name: " + objec.data[0].name + '<br>');
			outputText += ("ID: " + objec.data[0].clan_id+ '<br>');
			// Store the clan ID
			clanID = objec.data[0].clan_id;
			// And pass it forwards
			return clanID;
		}
	)
	.then
	(
		// After reading in the Clan ID
		function(clanID)
		{
			// Fetch the clan information based on the ID given
			fetch('https://api.worldofwarships.com/wows/clans/info/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&clan_id=' + clanID)
			.then
			(
				function(response)
				{
					// Similarly we'll take the response, store it as a JSON object, and pass it forwards
					return response.json();
				}
			)
			.then
			(
				function(data)
				{
					// We'll similarly output all of the details in the similar fashion
					var objec = data;
					console.log(objec.data[clanID]);
					outputText += ("Created by: " + objec.data[clanID].creator_name + "<br>");
					outputText += ("Current Commander: " + objec.data[clanID].leader_name + "<br>");
					outputText += ("Description: " + objec.data[clanID].description + "<br>");
					outputArea.innerHTML = outputText;
					// We'll then daisy chain the clanID straight through here
					return objec.data[clanID];
				}
			)
			.then
			(
				function(objec)
				{
					console.log(objec.members_count);
					var numMembers = objec.members_count;
					for(var i = 0; i < numMembers; i++)
					{
						var playerID = objec.members_ids[i];
						fetch("https://api.worldofwarships.com/wows/account/info/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&account_id=" + playerID)
						.then
						(
							function(response)
							{
								var block = response.json();
								return block;
							}
						)
						.then
						(
							function(passThrough)
							{
								console.log(passThrough.data[playerID]);
							}
						)
					}
				}
			)
		}
	)

}




