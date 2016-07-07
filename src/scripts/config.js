(function ( app ) {
  "use strict";

  var config = {
    firebase: {
      apiKey: "AIzaSyAGF2jMU3BrRq7WAMn_LWI08wb17hRvd1U",
      authDomain: "contact-list-workshop.firebaseapp.com",
      databaseURL: "https://contact-list-workshop.firebaseio.com",
      storageBucket: "contact-list-workshop.appspot.com"
    }
  };

  app.config = app.config || config;

})( window.app = window.app || {});
