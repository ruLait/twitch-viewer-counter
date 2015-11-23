$(document).ready(function(){
	loadViewers();
	function loadViewers(){
		$.getJSON('https://api.twitch.tv/kraken/streams/'+encodeURIComponent(username)+"?callback=?", function(data) {
			if(data["stream"]!=null) {
				if(data['streams']) {
					$('.counter').text("Channel is offline.");
					$('.icon').hide();
				} else {
					var viewer_count = data['stream']['viewers'];
					$('.counter').text(viewer_count);
						//console.log(data);
					$('.icon').show();
				}
			} else {
					$('.counter').text("Channel is offline.");
					$('.icon').hide();
			}
		});
	}
	setInterval(function(){
		loadViewers();
	}, updInterval);
});