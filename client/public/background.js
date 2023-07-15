
chrome.runtime.onMessage.addListener((message, sender,sendResponse) => {
    if(message.action === "getTabURL"){
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            console.log(tabs)
            const tabUrl = tabs[0].url;
            const urlObj = new URL(tabUrl);
            const originUrl = urlObj.origin;
            console.log(originUrl);
            chrome.runtime.sendMessage({ action: 'tabUrl', url: originUrl });
        });
    }
})