const MAX_TABS = 15;
function monitorTabs() {
  chrome.tabs.query({}, (tabs) => {
    const totalTabs = tabs.length;

    if (totalTabs > MAX_TABS) {
      tabs.sort((a, b) => a.lastAccessed - b.lastAccessed);

      const oldestTabId = tabs[0].id;
      chrome.tabs.remove(oldestTabId, () => {
        console.log(`A aba mais antiga foi fechada (ID: ${oldestTabId}).`);
      });
    }
  });
}

chrome.tabs.onCreated.addListener(() => {
  monitorTabs();
});

chrome.tabs.onRemoved.addListener(() => {
  monitorTabs();
});