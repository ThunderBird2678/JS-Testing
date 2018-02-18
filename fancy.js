var objec;

var input = document.getElementById("searchTxt").value;
console.log(input);

fetch('https://api.worldofwarships.com/wows/clans/list/?application_id=demo&search=DOW')
	.then(response => response.json())
		.then(data => 
		{
			objec = data;
			console.log(objec);
			console.log(typeof(objec));
			console.log(objec.data[0]);
			console.log(objec.data[0].clan_id + ", " + objec.data[0].name);
			document.getElementById("holder").innerHTML = objec.data[0].clan_id + ", " + objec.data[0].name;
		})


