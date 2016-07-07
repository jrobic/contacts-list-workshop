(function( app, firebase ) {
  'use strict';

  app.Api = app.Api || Api;

  function Api() {
    console.info('[Api] initialize...');

    var firebaseDb = firebase.initializeApp(app.config.firebase);
    this.db = firebaseDb.database().ref('contacts');
  }

  Api.prototype.update = function update(contactData) {
    console.log('update', contactData);
    return this.db.child('/' + contactData.uid).update(contactData);
  };

  Api.prototype.save = function save(contactData) {
    var newUid = app.utils.randomUid();
    contactData['createdAt'] = new Date().getTime();
    contactData['uid'] = newUid;

    return this.db.child('/' + newUid).set(contactData);
  };

  Api.prototype.remove = function remove(contactUid) {
    return this.db.child('/' + contactUid).remove();
  };

  Api.prototype.on = function (eventKind, callback) {
    this.db.on(eventKind, function (childSnapshot) {
      callback(new app.Contact(childSnapshot.val()));
    });
  }

})( window.app = window.app || {}, window.firebase);
