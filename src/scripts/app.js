(function () {
  'use strict';

  this.contacts = [];
  this.selectedContact = null;
  this.api = null;

  // -------------- Rendering Method
  this.renderContact = function (contact) {}

  this.updateContactElement = function updateContactElement() {}

  this.removeContactElement = function removeContactElement() {}


  // -------------- Click Handler
  this.removeHandler = function removeHandler() {}

  this.selectedHandler = function () {}

  this.cleanHandler = function cleanHandler() {}

  this.submitHandler = function submitHandler() {}

  // -------------- Contact Manager
  this.addContact = function addContact() {}

  this.removeContact = function removeContact() {}

  this.updateContact = function updateContact() {}

  this.attachEvents = function attachEvents() {
    // Add event handler on api
    this.api.on('child_added', this.addContact);
    this.api.on('child_removed', this.removeContact);
    this.api.on('child_changed', this.updateContact);

    // Add listener on submit button
    document
    .querySelector('button.form-contact-submit')
    .addEventListener('click', this.submitHandler);
    document
    .querySelector('button.form-contact-cancel')
    .addEventListener('click', this.cleanHandler);
  }


  this.init = function init() {
    console.info('[App] initialize...');
    this.api = new this.Api();

    this.attachEvents();
  }

}).call( window.app = window.app || {} );
