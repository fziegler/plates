function BaseUIWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var isMobileWeb = Titanium.Platform.osname == 'mobileweb';
	
	// create table view data object
	var data = [

		{title:'Window (Standalone)', hasChild:true, test:'ui/common/baseui/window_standalone'},
		{title:'Horizontal Layout', hasChild:true, test:'ui/common/baseui/horizontal_layout'}
	];
	
	
	
	// create table view
	for (var i = 0; i < data.length; i++ ) { data[i].color = '#000'; data[i].font = {fontWeight:'bold'} };
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		if (e.rowData.test)
		{
			var ExampleWindow = require(e.rowData.test),
				win = new ExampleWindow({title:e.rowData.title,containingTab:self.containingTab,tabGroup:self.tabGroup});
			if (Ti.Platform.name == "android") {
				
			} else {
				win.backgroundColor = "#fff";
				win.barColor = "#111";
			}
	
	
			if (e.index == 3)
			{
				if (Ti.Platform.name == "iPhone OS") {
					win.hideTabBar();
				}
			}
			if (Ti.Platform.name==='android' && e.rowData.test.indexOf('window_properties') >= 0) {
				// As explained in apidoc for Window, if opacity is ever to be changed for an Android
				// activity during its lifetime, it needs to use a translucent background.  We trigger
				// using a translucent theme by the presence of the opacity property, so we need to
				// set it here.  Setting it to 1 means it's totally opaque, but gives us the property to
				// make it more transparent later with the "toggle opacity" test.
				win.backgroundColor = "#191919"
				win.opacity = 1;
			}
			self.containingTab.open(win,{animated:true});
		}
	});
	
	// add table view to the window
	self.add(tableview);
	
	self.addEventListener('focus', function()
	{
		Ti.API.info('FOCUS RECEIVED IN base_ui');
		Ti.App.fireEvent('nav_back');
		
		if (Ti.Platform.osname !== 'mobileweb') {
			Ti.API.info(Ti.dumpCoverage());
		}
	});
	//
	//  ADD EVENT LISTENERS FOR CUSTOM EVENTS
	//
	var win = Titanium.UI.createWindow({
		height:30,
		width:250,
		bottom:110,
		borderRadius:10
	});
	
	var view = Titanium.UI.createView({
		backgroundColor:'#000',
		opacity:0.7,
		height:30,
		width:250,
		borderRadius:10
	});
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		font:{fontSize:13},
		textAlign:'center',
		width:'auto',
		height:'auto'
	});
	win.add(view);
	win.add(label);
	
	Titanium.App.addEventListener('event_one', function(e)
	{
		label.text = 'base_ui.js: event one, array length = ' + e.data.length;
		win.open();
		setTimeout(function()
		{
			win.close({opacity:0,duration:500});
		},1000);
	});
	
	Titanium.App.addEventListener('event_two', function(e)
	{
		label.text = 'base_ui.js: event two, name = ' + e.name;
		win.open();
		setTimeout(function()
		{
			win.close({opacity:0,duration:500});
		},1000);
	
	});

	
	return self;
};

module.exports = BaseUIWindow;
