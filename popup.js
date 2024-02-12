// // Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {file: 'payload.js'});;
});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onConnect.addListener(function (port){
	port.onMessage.addListener(function(message) {
	if(message.type=="m1")
	{document.getElementById('title').innerHTML = message.content}
	if(message.type=="m3")
	{var TABID = message.content}
	if(message.type=="m2")
	{	document.getElementById('url').innerHTML = message.content;

		const req = new XMLHttpRequest();
		const URL = " https://bwhindi.onrender.com/songify/"+message.content;
		document.body.innerText

		function callback() {
			if (req.readyState === XMLHttpRequest.DONE)
				{if (req.status === 200) {
					document.getElementById('song').innerHTML = req.responseText;
					function injectedFunction() {
						document.body.innerHTML=req.responseText;
					  }
					chrome.scripting.executeScript({
						target : {tabId : TABID},
						func : injectedFunction,
					});
			}}};

		req.open("GET", URL, true);
		req.onreadystatechange = callback;
		var temptext=req.responseText;
		req.send();
}
});
});

