var u = Ti.Android != undefined ? 'dp' : 0;
//A window object which will be associated with the stack of windows
exports.AppWindow = function(args) {
	var instance = Ti.UI.createWindow(args);

	var view = Ti.UI.createView({
		height : 40 + u,
		width : 320 + u,
		layout : 'horizontal',
		top : 0 + u,
		borderColor : '#133899',
		borderWidth : 1,
		borderRadius : 1
	});
	instance.add(view);
	var buttonshare = Ti.UI.createButton({
		title : 'Share',
		left : 5 + u,
		right : 5 + u,
		bottom : 1 + u,
		height : 40 + u,
		width : 150 + u
	});
	view.add(buttonshare);
	var buttoncheckin = Ti.UI.createButton({
		title : 'Check-In',
		left : 5 + u,
		right : 5 + u,
		bottom : 1 + u,
		height : 40 + u,
		width : 150 + u
	});
	view.add(buttoncheckin);
	buttoncheckin.addEventListener('click', function() {
		globals.tabs.currentTab.open(Ti.UI.createWindow({
			title : 'New Window',
			backgroundColor : 'white'
		}));
	});

	
	
	
	
	
	//news feed
	var scrollView = Titanium.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		top:50,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:false
	});
	
	instance.add(scrollView);
	

	
	var view = Ti.UI.createView({
		backgroundColor:'#EFEFEF',
		borderRadius:10,
		width:300,
		height:1000,
		top:0
	});
	
	scrollView.add(view);
	
	var button = Titanium.UI.createButton({
		title:'Scroll to Top',
		height:40,
		width:200,
		bottom:10
	});
	view.add(button);
	button.addEventListener('click', function()
	{
		scrollView.scrollTo(0,0);
	});
	
	return instance;
};
