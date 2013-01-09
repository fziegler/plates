/*
 * We'll follow a really simple paradigm in this example app. It's going to be a hierarchy of tables where you can drill
 * in to individual examples for each ACS namespace.
 *
 * To facilitate that, we will have a collection of "windowFunctions" like the "Users" window, and the "Login" window.
 *
 * These are defined in the "windows" folder and its children.
 *
 * That's it! Enjoy.
 */
var Cloud = require('ti.cloud');
Cloud.debug = true;

// Define our window store.
var windowFunctions = {};
function handleOpenWindow(evt) {
	var target = (evt.row && evt.row.title) || evt.target;
	if (windowFunctions[target]) {
		windowFunctions[target](evt);
	}
}

// Utility functions for defining windows.
var u = Ti.Android != undefined ? 'dp' : 0;
function createWindow() {
	return Ti.UI.createWindow({
		backgroundColor : '#fff',
		navBarHidden : false
	});
}

function addBackButton(win) {
	if (Ti.Android) {
		return 0;
	}
	var back = Ti.UI.createButton({
		title : 'Back',
		color : '#fff',
		backgroundColor : '#000',
		style : 0,
		top : 0,
		left : 0,
		right : 0,
		height : 40 + u
	});
	back.addEventListener('click', function(evt) {
		win.close();
	});
	win.add(back);
	return 40;
}

function createRows(rows) {
	for (var i = 0, l = rows.length; i < l; i++) {
		rows[i] = Ti.UI.createTableViewRow({
			backgroundColor : '#fff',
			title : rows[i],
			hasChild : true
		});
	}
	return rows;
}

function enumerateProperties(container, obj, offset) {
	for (var key in obj) {
		if (!obj.hasOwnProperty(key))
			continue;
		container.add(Ti.UI.createLabel({
			text : key + ': ' + obj[key],
			textAlign : 'left',
			color : '#000',
			backgroundColor : '#fff',
			height : 30 + u,
			left : offset,
			right : 20 + u
		}));
		if (obj[key].indexOf && obj[key].indexOf('http') >= 0 && (obj[key].indexOf('.jpeg') > 0 || obj[key].indexOf('.jpg') > 0 || obj[key].indexOf('.png') > 0)) {
			container.add(Ti.UI.createImageView({
				image : obj[key],
				height : 120 + u,
				width : 120 + u,
				left : offset
			}));
		}
		if ( typeof (obj[key]) == 'object') {
			enumerateProperties(container, obj[key], offset + 20);
		}
	}
}

function error(e) {
	var msg = (e.error && e.message) || JSON.stringify(e);
	if (e.code) {
		alert(msg);
	} else {
		Ti.API.error(msg);
	}
}

function convertISOToDate(isoDate) {
	isoDate = isoDate.replace(/\D/g, " ");
	var dtcomps = isoDate.split(" ");
	dtcomps[1]--;
	return new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]));
}

/*
// Include the window hierarchy.
Ti.include(
'windows/chats/table.js',
'windows/checkins/table.js',
'windows/clients/table.js',
'windows/customObjects/table.js',
'windows/emails/table.js',
'windows/events/table.js',
'windows/files/table.js',
'windows/friends/table.js',
'windows/photoCollections/table.js',
'windows/photos/table.js',
'windows/places/table.js',
'windows/posts/table.js',
'windows/keyValues/table.js',
'windows/messages/table.js',
'windows/pushNotifications/table.js',
'windows/reviews/table.js',
'windows/social/table.js',
'windows/status/table.js',
'windows/users/table.js',
'windows/accessControlLists/table.js'
);

// Define our main window.
var win = Ti.UI.createWindow({
backgroundColor: '#fff',
navBarHidden: true,
exitOnClose: true
});
var table = Ti.UI.createTableView({
backgroundColor: '#fff',
data: createRows([
'Users',
'Access Control Lists',
'Chats',
'Checkins',
'Clients',
'Custom Objects',
'Emails',
'Events',
'Files',
'Friends',
'Key Values',
'Messages',
'Photo Collections',
'Photos',
'Places',
'Posts',
'Push Notifications',
'Reviews',
'Social',
'Status'
])
});
table.addEventListener('click', handleOpenWindow);
win.add(table);
win.open();

*/

// Define our main window.
var win = Ti.UI.createWindow({
	backgroundColor : '#fff',
	navBarHidden : true,
	exitOnClose : true
});

var content = Ti.UI.createScrollView({
	top : u,
	contentHeight : 'auto',
	layout : 'vertical'
});
win.add(content);

var l2 = Titanium.UI.createLabel({
	text : 'my plates',
	height : 100,
	width : 'auto',
	shadowColor : '#aaa',
	shadowOffset : {
		x : 5,
		y : 5
	},
	color : '#900',
	font : {
		fontSize : 48,
		fontStyle : 'italic'
	},
	top : 30,
	textAlign : 'center'
});
content.add(l2);
// TODO: Get your own App ID from Facebook: https://developers.facebook.com/docs/opengraph/tutorial/#create-app
Ti.Facebook.appid = '372240659538372';
Ti.Facebook.permissions = ['publish_stream', 'read_stream'];

content.add(Ti.Facebook.createLoginButton({
	top : 10 + u,
	style : Ti.Platform.name == 'iPhone OS' ? Ti.Facebook.BUTTON_STYLE_WIDE : 'wide'
}));
var l1 = Titanium.UI.createLabel({
	id : 'font_label_test',
	text : 'or traditional login...',
	top : 10,
	height : 50,
	textAlign : 'left'
});

content.add(l1);

var login = Ti.UI.createTextField({
	hintText : 'Login',
	top : 10 + u,
	left : 10 + u,
	right : 10 + u,
	height : 40 + u,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	autocorrect : false
});
content.add(login);

var password = Ti.UI.createTextField({
	hintText : 'Password',
	top : 10 + u,
	left : 10 + u,
	right : 10 + u,
	height : 40 + u,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	passwordMask : true
});
content.add(password);

var button = Ti.UI.createButton({
	title : 'Login User',
	top : 10 + u,
	left : 10 + u,
	right : 10 + u,
	bottom : 10 + u,
	height : 40 + u
});
content.add(button);

var fields = [login, password];

function submitForm() {
	for (var i = 0; i < fields.length; i++) {
		if (!fields[i].value.length) {
			fields[i].focus();
			return;
		}
		fields[i].blur();
	}
	button.hide();

	Cloud.Users.login({
		login : login.value,
		password : password.value
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			login.value = password.value = '';
			alert('Logged in! You are now logged in as ' + user.id);
		} else {
			error(e);
		}
		button.show();
	});
}

button.addEventListener('click', submitForm);
for (var i = 0; i < fields.length; i++) {
	fields[i].addEventListener('return', submitForm);
}

var buttonc = Ti.UI.createButton({
	title : 'Create new plate',
	top : 10 + u,
	left : 10 + u,
	right : 10 + u,
	bottom : 10 + u,
	height : 40 + u
});

buttonc.addEventListener('click', openMainView);

content.add(buttonc);
button.addEventListener('click', submitForm);
for (var i = 0; i < fields.length; i++) {
	fields[i].addEventListener('return', submitForm);
}

win.addEventListener('open', function() {
	//login.focus();
});
win.open();

function openMainView() {
	var Window;

	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	// iPhone makes use of the platform-specific navigation controller,
	// all other platforms follow a similar UI pattern
	if (osname === 'iphone' || osname === 'ipad') {
		Window = require('ui/handheld/ios/ApplicationWindow');
	} else if (osname === 'mobileweb') {
		Window = require('ui/mobileweb/ApplicationWindow');
		/*TODO Fionn: mobileweb not supported....*/
	} else {
		Window = require('ui/handheld/android/ApplicationWindow');
	}
	
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	var theTabGroup = new ApplicationTabGroup();
	if (osname === 'iphone' || osname === 'ipad') {
		theTabGroup.open({
			transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	} else {
		theTabGroup.open();
	}

}