Ti.include("../include/inheritance.js");

var View = Class.extend({
	
    init: function(win, controller)
    {
    	this.u = Ti.Android != undefined ? 'dp' : 0;
        this.win = win;
        this.controller = controller;

        win.viewClass = this;
    }
});
