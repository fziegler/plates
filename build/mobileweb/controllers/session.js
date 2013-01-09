Ti.include('../Redux/redux.js');

var SessionController = Controller.extend({
    init: function(win) {
        this._super(win);
        //add a single variable to the global scope to which we may choose to
		//intentionally add items to
		this.globals = {};
    }
});

(function() {
    var win = Titanium.UI.currentWindow;
    new SessionController(win);
})();

