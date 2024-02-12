var port = chrome.runtime.connect();

port.postMessage({type: "m1", content: document.title});
port.postMessage({type: "m2", content: document.URL});
// port.postMessage({type: "m3", content: })
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    port.postMessage({type: "m3", content:tabs[0] });
  });
