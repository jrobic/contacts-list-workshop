(function( app, CryptoJS ) {
  'use strict';

  app.Contact = app.Contact || Contact;

  function Contact(data) {
    this.uid = data.uid || "";
    this.firstName = data.firstName || "";
    this.lastName = data.lastName || "";
    this.age = data.age;
    this.email = data.email || "";
    this.mobile = data.mobile || "";
    this.createdAt = data.createdAt;
  }

})( window.app = window.app || {}, window.CryptoJS);
