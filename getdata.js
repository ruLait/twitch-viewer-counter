function GetJSONFile(path, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				var data = JSON.parse(httpRequest.responseText);
				if (callback) callback(data);
			}
		}
	};
	httpRequest.open("GET", path);
	httpRequest.send(); 
}

var counter = document.querySelector(".counter");
var onlineicon = document.querySelector(".icon");

function loadViewers(){
	GetJSONFile("https://api.twitch.tv/kraken/streams/" + encodeURIComponent(username) + "?from=tvc&ts=" + Date.now(), function(data){
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
}

loadViewers();

setInterval(function(){
	loadViewers();
}, updInterval);