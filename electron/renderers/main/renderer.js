const tabGroup = document.querySelector("tab-group");
tabGroup.setDefaultTab({
    title: "New Page",
    src: "../home/index.html",
    active: true
});
const tab = tabGroup.addTab({
    title: "main tab",
    src: "https://www.google.com/",
    active: true
});                                             