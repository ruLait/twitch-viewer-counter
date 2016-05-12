"use strict";

var params = {}, parts, nv, i;

if (location.search) {
	parts = location.search.substring(1).split('&');
	for (i = 0; i < parts.length; i++) {
		nv = parts[i].split('=');
		if (!nv[0]) continue;
		params[nv[0]] = nv[1] || true;
	}
}

var username, updInterval, fontcolor, size;

if (params.u === undefined) {username = "twitch"} else {username = params.u}
if (params.interval === undefined) {updInterval = "5000"} else {updInterval = params.interval + "000"}
if (params.color === undefined) {fontcolor = "#000"} else {fontcolor = "#" + params.color}
if (params.size === undefined) {size = "25px"} else {size = params.size + "px"}

var counter = document.querySelector(".counter"),
	onlineicon = document.querySelector(".icon"),
	url = "https://api.twitch.tv/kraken/streams/" + encodeURIComponent(username) + "?from=tvc&ts=";

function style(){
	onlineicon.style.width = size;
	onlineicon.style.height = size;
	counter.style.fontSize = size;
	counter.style.color = fontcolor;

	// Just for debug
	console.log("User: " + username + "\nCounter size: " + size + "\nFont color: " + fontcolor);
}

function loadViewers(){
	if(self.fetch) {
		window.fetch(url + Date.now()).then(function(response){
			if (response.status !== 200) {
				counter.textContent = "Twitch API error: " + response.status;
				onlineicon.style.display = "none";
				return;
			}
			response.json().then(function(data) {
				if(data["stream"]!=null) {
					if(data["streams"]) {
						counter.textContent = "Channel is offline.";
						onlineicon.style.display = "none";
					} else {
						var viewer_count = data["stream"]["viewers"];
						counter.textContent = viewer_count;
						onlineicon.style.display = "inline-block";
					}
				} else {
					counter.textContent = "Channel is offline.";
					onlineicon.style.display = "none";
				}
			});
		});
	} else {
		counter.innerHTML = "Your browser doesn't support <a href='http://caniuse.com/#feat=fetch'>fetch</a>";
		onlineicon.style.display = "none";
	}
}

style();
loadViewers();

setInterval(function(){
	loadViewers();
}, updInterval);
