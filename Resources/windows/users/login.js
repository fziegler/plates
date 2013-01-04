windowFunctions['Login User'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var content = Ti.UI.createScrollView({
        top: offset + u,
        contentHeight: 'auto',
        layout: 'vertical'
    });
    win.add(content);
    
    
    
	var l2 = Titanium.UI.createLabel({
		text:'Local my car!?',
		height:50,
		width:'auto',
		shadowColor:'#aaa',
		shadowOffset:{x:5,y:5},
		color:'#900',
		font:{fontSize:48, fontStyle:'italic'},
		top:70,
		textAlign:'center'
	});
    content.add(l2);
    
   content.add(Ti.Facebook.createLoginButton({
        top: 10 + u,
        style: Ti.Platform.name == 'iPhone OS'
            ? Ti.Facebook.BUTTON_STYLE_WIDE
            : 'wide'
    }));
	var l1 = Titanium.UI.createLabel({
		id:'font_label_test',
		text:'or traditional login...',
		top:10,
		height:50,
		textAlign:'left'
	});
	
    content.add(l1);
    
    var login = Ti.UI.createTextField({
        hintText: 'Login',
        top: 10 + u, left: 10 + u, right: 10 + u,
        height: 40 + u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false
    });
    content.add(login);

    var password = Ti.UI.createTextField({
        hintText: 'Password',
        top: 10 + u, left: 10 + u, right: 10 + u,
        height: 40 + u,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: true
    });
    content.add(password);

    var button = Ti.UI.createButton({
        title: 'Login User',
        top: 10 + u, left: 10 + u, right: 10 + u, bottom: 10 + u,
        height: 40 + u
    });
    content.add(button);

 
    var fields = [ login, password ];

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
            login: login.value,
            password: password.value
        }, function (e) {
            if (e.success) {
                var user = e.users[0];
                login.value = password.value = '';
                alert('Logged in! You are now logged in as ' + user.id);
            }
            else {
                error(e);
            }
            button.show();
        });
    }

    button.addEventListener('click', submitForm);
    for (var i = 0; i < fields.length; i++) {
        fields[i].addEventListener('return', submitForm);
    }

    win.addEventListener('open', function () {
        //login.focus();
    });
    win.open();
};