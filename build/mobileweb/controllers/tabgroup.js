Ti.include('../Redux/redux.js');
include('../views/main/main.js');

var TabGroupController = Controller.extend({
    init: function(win) {
        this._super(win);

        this.view = new MainView(win, this);
    }
});

(function() {
    var win = Titanium.UI.currentWindow;

    new TabGroupController(win);
})();

