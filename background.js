chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      if (tab.url.includes('leetcode.com/problems/')) {
        chrome.storage.local.set({ currentURL: tab.url });
      }
    }
  });
  