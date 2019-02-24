var playersDictionary;

function search()
{
	startUp();
}

function getAPIInfo(url)
{
	return fetch(url)
		.then (info => info.json());
}

function addToPage(str)
{
	document.getElementById("holder").innerHTML += str;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startUp()
{
	document.getElementById("holder").innerHTML = "";
	var input = document.getElementById("searchTxt").value;
	console.log(input);

	var clanID;

	getAPIInfo('https://api.worldofwarships.com/wows/clans/list/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&search=' + input)
	.then (info => 
	{
		console.log(info.data);
		addToPage("Clan Tag: [" + info.data[0].tag + "] <br>");
		addToPage("Name: " + info.data[0].name + "<br>");
		addToPage("Clan ID: " + info.data[0].clan_id + " <br>");

		clanID = info.data[0].clan_id;
		return clanID;
	})
	.then(clanID => getAPIInfo('https://api.worldofwarships.com/wows/clans/info/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&clan_id=' + clanID))
	.then(info => 
	{
		info = jsonPath(info.data, "$.*")[0];
		console.log(info);
		addToPage("Creator: " + info.creator_name + "<br>");
		addToPage("Current Commander: " + info.leader_name + "<br>");
		addToPage("Description: " + info.description + "<br>");
		addToPage("Members: <br>");

		var memberInfo = new Object();
		memberInfo["members_count"] = info.members_count;
		memberInfo["members_ids"] = info.members_ids;
		return memberInfo;
	})
	.then(async memberInfo => 
	{
		var isDone = false;
		playersDictionary = new Object();
		for(var i = 0; i < memberInfo.members_count; i++)
		{
			var counter = 0;
			getAPIInfo("https://api.worldofwarships.com/wows/account/info/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&account_id=" + memberInfo.members_ids[i])
			.then(info =>
			{
				info = jsonPath(info, "$.data.*")[0];
				addToPage(info.nickname + "<br>");
				playersDictionary[info.account_id] = info;
				console.log(info);
			})
			.then(func => 
			{
				counter += 1; 
				if(counter == memberInfo.members_count)
				{
					isDone = true;
					console.log("Stop sleeping!!");
				}
			})
		}

		while(!isDone)
		{
			await sleep(500);
		}
	})
	.then(test=>
	{
		console.log("When does this print?");
	})
}

// 					for(var i = 0; i < numMembers; i++)
// 					{
// 						playersDictionary[objec.members_ids[i]] = "TEST: " + objec.members_ids[i];
// 					}

// 					for(var i = 0; i < numMembers; i++)
// 					{
// 						var playerID = objec.members_ids[i];
// 						fetch("https://api.worldofwarships.com/wows/account/info/?application_id=65e92b6a331f1aa07d01dd46ed8f4821&account_id=" + playerID)
// 						.then
// 						(
// 							function(response)
// 							{
// 								return response.json();
// 							}
// 						)
// 						.then
// 						(
// 							function(rawObject)
// 							{
// 								var playerData = jsonPath(rawObject, "$.data.*");
// 								playerData = playerData[0];
// 								playersDictionary[playerData.account_id] = playerData;
// 							}
// 						)
// 					}
// 				}
// 			)
// 			.then
// 			(
// 				function()
// 				{
// 					doneSetup();
// 				}
// 			)
// 		}
// 	)
// }

// function doneSetup()
// {
// 	for(var key in playersDictionary)
// 	{
// 		console.log(key);
// 	}
// }




