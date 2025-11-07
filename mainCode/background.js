const TARGET_URL = "https://youtu.be/UIp6_0kct_U?si=ZWXN3ijJzmtFts8a";
let tabLink = {};
const VIDEO_LIST = [
    "https://youtu.be/UIp6_0kct_U?si=ZWXN3ijJzmtFts8a",
    "https://youtu.be/3JZ_D3ELwOQ?si=ZWXN3ijJzmtFts8a",
    TARGET_URL
];
const randomUrl = VIDEO_LIST[Math.floor(Math.random() * VIDEO_LIST.length)];

chrome.tabs.onUpdated.addListener((tabId, _changeInfo, tab) => {
    if (tab.url) tabLink[tabId] = tab.url;
});

chrome.tabs.query({}, (tabs) => tabs.forEach(tab => {
    if (tab.url) tabLink[tab.id] = tab.url;
}));

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    const closedUrl = tabLink[tabId] || "";
    delete tabLink[tabId];
    if (!removeInfo.isWindowClosing && !closedUrl.includes("youtube.com") && !closedUrl.includes("youtu.be")) { 
        //Apa lagi cok domain yutub
        chrome.tabs.create({ url: randomUrl, active: true });
    }
});