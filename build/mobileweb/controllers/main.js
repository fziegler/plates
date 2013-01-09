Ti.include('../Redux/redux.js');
include('../views/login/login.js');

var MainController = Controller.extend({
    init: function(win) {
        this._super(win);

        this.view = new LoginView(win, this);
    }
    
(function openMainView() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	//var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	var Window;

	// iPhone makes use of the platform-specific navigation controller,
	// all other platforms follow a similar UI pattern
	if (osname === 'iphone' || osname === 'ipad') {
		Window = require('ui/handheld/ios/ApplicationWindow');
	} else if (osname === 'mobileweb') {
		Window = require('ui/mobileweb/ApplicationWindow');
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
})
});

(function() {
    var win = Titanium.UI.currentWindow;

    new MainController(win);
    
})();

