<?php
	$username = $_GET["u"];
		if (empty($username)) {$username = "twitch";}
	$fontcolor = $_GET["color"];
		if (empty($fontcolor)) {$fontcolor = "000";}
	$size = $_GET["size"];
		if (empty($size)) {$size = "25";}
	$interval = $_GET["interval"];
		if (empty($interval)) {$interval = "5";}
?>
<!DOCTYPE HTML>
<html lang="en"><head>
	<!--
		Repository - github.com/ruLait/twitch-viewer-counter
		MIT License - github.com/ruLait/twitch-viewer-counter/blob/master/license.txt

		Do not remove this, please.
	-->
	<meta charset="utf-8">
	<title>Twitch Viewer Counter</title>
	<link rel="shortcut icon" href="images/twitch-favicon.ico">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="robots" content="noindex,follow">
	<meta name="author" content="ruLait">
	<link href="//fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<style type="text/css">
		* {
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}

		html, body {
			width: 100%; height: 100%;
			margin: 0 auto;
			background-color: transparent;
		}

		#container > * {
			vertical-align: middle;
		}

		.icon {
			display: none;
			width: <?php echo htmlspecialchars($size) . 'px'; ?>;
			height: <?php echo htmlspecialchars($size) . 'px'; ?>;
		}

		.counter {
			font-size: <?php echo htmlspecialchars($size) . 'px'; ?>;
			font-family: Roboto, Tahoma, Arial, sans-serif;
			color: <?php echo '#' . htmlspecialchars($fontcolor); ?>;
		}
	</style>
</head><body>
	<div id="container">
		<img class="icon" src="images/viewers-icon.svg">
		<span class="counter">Loading...</span>
	</div>
	<script type="text/javascript">
		var username = "<?php echo htmlspecialchars($username); ?>";
		var updInterval = <?php echo htmlspecialchars($interval) . '000'; ?>;
	</script>
	<script type="text/javascript" src="getdata.js"></script>
</body></html>