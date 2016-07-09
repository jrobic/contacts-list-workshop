(function () {
  'use strict';

  this.contacts = [];
  this.selectedContact = null;
  this.api = null;

  // -------------- Rendering Method
  this.renderContact = function (contact) {
    var tbody = document.querySelector('#contacts-list tbody');
    var row = document.createElement('tr');
    row.setAttribute('contact-uid', contact.uid);

    row.innerHTML = "<td contact-attr=\"firstName\">" + contact.firstName + "</td> \
      <td contact-attr=\"lastName\">" + contact.lastName + "</td> \
      <td contact-attr=\"age\">" + contact.age + "</td> \
      <td contact-attr=\"email\">" + contact.email + "</td> \
      <td contact-attr=\"mobile\">" + contact.mobile + "</td> \
      <td contact-attr=\"createdAt\">" + new Date(contact.createdAt).toLocaleString() + "</td> \
      <td> \
        <button class=\"btn btn-primary contact-update\">update</button> \
        <button class=\"btn btn-danger contact-delete\">delete</button> \
      </td>";

    tbody.appendChild(row);
    tbody.querySelector('tr[contact-uid="' + contact.uid + '"] .contact-update')
         .addEventListener('click', this.selectedHandler.bind(this, contact));
    tbody.querySelector('tr[contact-uid="' + contact.uid + '"] .contact-delete')
         .addEventListener('click', this.removeHandler.bind(this, contact.uid));

    return;
  }

  this.updateContactElement = function updateContactElement(contact) {
    console.log('update element', contact);
    var contactElement = document.querySelector('#contacts-list tbody tr[contact-uid="' + contact.uid + '"]');
    var tds = contactElement.querySelectorAll('td[contact-attr]');

    Array.prototype.forEach.call(tds, function (td) {
      td.innerHTML = contact[td.getAttribute('contact-attr')];
    });
  }

  this.removeContactElement = function removeContactElement(contactUid) {
    var contactsWrapper = document.querySelector('#contacts-list tbody');
    var element = contactsWrapper.querySelector('tr[contact-uid="' + contactUid + '"]');
    contactsWrapper.removeChild(element);
  }


  // -------------- Click Handler
  this.removeHandler = function removeHandler(contactUid, event) {
    event.preventDefault();
    if (contactUid) {
      this.api.remove(contactUid);
    }
  }

  this.selectedHandler = function (contact, event) {
    event.preventDefault();
    this.selectedContact = contact;

    var form = document.querySelector('.form-contact');
    var inputs = form.querySelectorAll('input');

    Array.prototype.forEach.call(inputs, function (input) {
      input.value = contact[input.getAttribute('name')];
    });
  }

  this.cleanForm() {
    this.selectedContact = null;

    var form = document.querySelector('.form-contact');
    var inputs = form.querySelectorAll('input');

    Array.prototype.forEach.call(inputs, function (input) {
      input.value = null;
    });
  }

  this.cleanHandler = function cleanHandler(event) {
    event.preventDefault();
    this.cleanForm();
  }

  this.submitHandler = function submitHandler(event) {
    event.preventDefault();

    var form = document.querySelector('.form-contact');
    var inputs = form.querySelectorAll('input');

    var contactData = {};

    Array.prototype.forEach.call(inputs, function (input) {
      contactData[input.getAttribute('name')] = input.value;
    });

    if (!this.selectedContact) {
      var contact = new this.Contact(contactData);
      this.api.save(contactData);
    } else {
      this.api.update(contactData);
    }

    this.cleanForm();
  }

  // -------------- Contact Manager
  this.addContact = function addContact(contact) {
    console.log('add');
    this.contacts.push(contact);
    this.renderContact(contact);
  }

  this.removeContact = function removeContact(contact) {
    var index = this.contacts.indexOf(contact);
    this.contacts = this.contacts.slice(index, 1);
    this.removeContactElement(contact.uid);
  }

  this.updateContact = function updateContact(contact) {
    console.log('change ', contact);
    this.contacts.forEach(function (c) {
      if (c.uid === contact.uid) {
        c = contact;
        this.updateContactElement(c);
      }
    }.bind(this));
  }

  this.attachEvents = function attachEvents() {
    // Add event handler on api
    this.api.on('child_added', this.addContact.bind(this));
    this.api.on('child_removed', this.removeContact.bind(this));
    this.api.on('child_changed', this.updateContact.bind(this));

    // Add listener on submit button
    document
    .querySelector('button.form-contact-submit')
    .addEventListener('click', this.submitHandler.bind(this));
    document
    .querySelector('button.form-contact-cancel')
    .addEventListener('click', this.cleanHandler.bind(this));
  }


  this.init = function init() {
    console.info('[App] initialize...');
    this.api = new this.Api();

    this.attachEvents();
  }

}).call( window.app = window.app || {} );
