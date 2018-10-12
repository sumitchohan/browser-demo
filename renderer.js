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
    view.setAttribute('src', config[sam_env].url);
    console.log('login clicked');
    acquireAccessToken(function(){console.log("token" + sam_access_token)});
}
var sam_env = 'tst'
var config = {
    qa: { url: 'https://sams.ttx.com/admin/ui/applications', clientId: 'f40733a5-34b3-4591-a174-025326a3fc03' },
    prod: { url: 'https://sam.ttx.com/admin/ui/applications', clientId: 'f725f14f-c21f-4718-af77-cf85b2fd3bfd' },
    dev: { url: 'https://samd.ttx.com/admin/ui/applications', clientId: '1ceb3870-a843-454c-aa8a-c4c2841aec51' },
    tst: { url: 'https://samt.ttx.com/admin/ui/applications', clientId: '6871a66a-7346-455b-b879-2b676f080b6d' }
}
var sam_access_token;
function setAccessToken(t)
{
    console.log(t);
    sam_access_token=t;
}
function acquireAccessToken(callback)
{
    console.log("checking..")
    if(sam_access_token)
    {
        callback();
    }
    else
    {
        setTimeout(() => {   acquireAccessToken(callback)         
        }, 1000);
    }
} 
var lastLoadedTime=new Date();
function finishedLoad(event) {
    lastLoadedTime=new Date();
    setTimeout(function(){
        if((new Date()-lastLoadedTime)>1998)
        {
            if (view.src.toString().toLowerCase().indexOf('.ttx.com/admin') > 0 || view.src.toString().toLowerCase().indexOf('google') > 0) {
                view.style.height = '0px';
                if (view.src.toString().toLowerCase().indexOf('.ttx.com/admin') > 0) {
                    tokenAccessKey='adal.access.token.key' + config[sam_env].clientId ;
                    console.log(tokenAccessKey);
                    var tokenResponse = view.getWebContents().executeJavaScript('localStorage["'+tokenAccessKey+ '"]');
                    if (tokenResponse) {
                        tokenResponse.then(function (s) {
                            setAccessToken(s);
                        });
                    }
                }
            }
            else
            {
                view.style.height = '480px';
            }
        }
    },2000);
    console.log("Navigated to - " + view.src);
} 
console.log(sam_access_token);
console.log(steps);
view.style.height = '0px';
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




