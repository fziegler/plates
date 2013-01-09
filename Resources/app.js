// add a "require" function to the global scope (global object) which is smarter
// http://en.wikipedia.org/wiki/Monkey_patch ;)
require('lib/require_patch').monkeypatch(this);

// We do this at the top of all of our files to include redux:
Ti.include('Redux/redux.js');

// Include MVC pattern
includeGlobal('/include/inheritance.js', '/common/view.js', '/common/controller.js');

// Include our RJSS
includeRJSSGlobal('rjss/common.rjss');

// Tell the compiler which modules we are going to use; note there are no () on these!
var used = [Ti.UI.createTabGroup, Ti.UI.createWindow, Ti.UI.createTab, Ti.UI.createLabel, Ti.UI.createButton, Ti.Platform.locale];

var Cloud = require('ti.cloud');
Cloud.debug = true;
var globals = {};

//This is the main window of the application
var login = new Window({
	url : "controllers/main.js",
	backgroundColor : '#fff',
	navBarHidden : true,
	exitOnClose : true
});
login.open();

Ti.App.addEventListener('grantEntrance', function(event) {
	alert(event.name);
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	var AppTabGroup = require('views/tab/AppTabGroup'), AppWindow = require('views/main/AppWindow');

	//create our global tab group
	globals.tabs = new AppTabGroup({
		title : 'Home',
		icon : 'images/KS_nav_ui.png',
		window : new AppWindow({
			title : 'Home',
			backgroundColor : 'white'
		})
	}, {
		title : 'Settings',
		icon : 'images/KS_nav_views.png',
		window : new AppWindow({
			title : 'Settings',
			backgroundColor : 'white'
		})
	});

	if (osname === 'iphone' || osname === 'ipad') {
		globals.tabs.open({
			transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	} else {
		globals.tabs.open();
	}
});
