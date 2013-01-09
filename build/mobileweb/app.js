// add a "require" function to the global scope (global object) which is smarter
// http://en.wikipedia.org/wiki/Monkey_patch ;)
require('lib/require_patch').monkeypatch(this);

// We do this at the top of all of our files to include redux:
Ti.include('Redux/redux.js');

// Include MVC pattern
includeGlobal('/include/inheritance.js', '/include/db.js', '/common/view.js', '/common/controller.js');

// Include our RJSS
includeRJSSGlobal('rjss/common.rjss');

// Tell the compiler which modules we are going to use; note there are no () on these!
var used = [Ti.UI.createWindow];

var Cloud = require('ti.cloud');
Cloud.debug = true;


var globals = {};

//This is the main window of the application
var main = new Window({
	url : "controllers/main.js"
});

var AppTabGroup = require('views/tab/AppTabGroup');

main.open();
//create our global tab group
globals.tabs = new AppTabGroup({
	title : 'Home',
	icon : 'images/KS_nav_ui.png',
	window : main
});

// globals.tabs.open(); 