Ti.include('../Redux/redux.js');
include('../views/login/login.js');

var MainController = Controller.extend({

    init: function(win) {
        this._super(win);

        this.view = new LoginView(win, this);
     
    }

   
}

);


(function() {
    var win = Titanium.UI.currentWindow;

    new MainController(win);
    
})();

