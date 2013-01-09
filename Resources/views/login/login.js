Ti.include('../../Redux/redux.js');

// Tell the compiler which modules we are going to use; note there are no () on these!
var used = [Ti.UI.createLabel];

var LoginView = View.extend({
	init : function(win, controller) {
		this._super(win, controller);

		this.layout();
	},

	layout : function() {

		var content = Ti.UI.createScrollView({
			top : this.u,
			contentHeight : 'auto',
			layout : 'vertical'
		});
		this.win.add(content);

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
			top : 10 + this.u,
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
			top : 10 + this.u,
			left : 10 + this.u,
			right : 10 + this.u,
			height : 40 + this.u,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
			autocorrect : false
		});
		content.add(login);

		var password = Ti.UI.createTextField({
			hintText : 'Password',
			top : 10 + this.u,
			left : 10 + this.u,
			right : 10 + this.u,
			height : 40 + this.u,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			passwordMask : true
		});
		content.add(password);

		var button = Ti.UI.createButton({
			title : 'Login User',
			top : 10 + this.u,
			left : 10 + this.u,
			right : 10 + this.u,
			bottom : 10 + this.u,
			height : 40 + this.u
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
					alert('Logged in! You are now logged in as ' + this.user.id);
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
			top : 10 + this.u,
			left : 10 + this.u,
			right : 10 + this.u,
			bottom : 10 + this.u,
			height : 40 + this.u
		});

		buttonc.addEventListener('click', function(e) {
			Ti.App.fireEvent('grantEntrance', {
				name : "test",
				email : "123"
			});
		});

		content.add(buttonc);
		button.addEventListener('click', submitForm);
		for (var i = 0; i < fields.length; i++) {
			fields[i].addEventListener('return', submitForm);
		}

	}
});

