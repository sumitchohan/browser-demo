// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var ById = function (id) {
    return document.getElementById(id);
 }
 var jsonfile = require('jsonfile');
 var favicon = require('favicon-getter').default;
 var path = require('path');
 var uuid = require('uuid');
 var steps = path.join(__dirname, 'steps.json');
 
 var view = ById('view'), views = ById('views'), login = ById('logIn');
 function login_click() {
    view.setAttribute('src', 'https://login.microsoftonline.com/common/oauth2/authorize?response_type=id_token&client_id=5b6e0ea6-1a26-4b99-9dbf-11b7a6f996b4&redirect_uri=https%3A%2F%2Fsam.ttx.com%2Fadmin%2Fui%2Fapplications&domain_hint=ttx.com');
    console.log('login clicked');
    views.hidden = false;
 }
 
 function finishedLoad(event) {
    if (view.src.toString().toLowerCase().indexOf('fs.ttx.com') > 0) {
        view.getWebContents().executeJavaScript('document.getElementById("passwordInput").id')
            .then(function (s) {
                if (s === "passwordInput") {
                    views.hidden = false;
                }
            });
    }
    else {
        views.hidden = true;
    }
 }
 console.log(steps);
 login.addEventListener('click', login_click);
 view.addEventListener('did-finish-load', finishedLoad);
 // https://github.com/hokein/electron-sample-apps/blob/master/webview/browser/browser.js#L5
 // To Do add dev tools open ✔️
 // update url ✔️
 // add bookmark by pressing button ✔️
 // load all bookmarks when list is clicked ✔️
 
 
 
 // To Do / Continue
 // Feedback when loading
 // Feedback with favorite icon to show that bookmark is not-added/added/already-added
 // Tabs !:@
 // Option to remove bookmarks.
 
 
 
 
 