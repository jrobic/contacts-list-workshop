/* eslint no-console: 0 */
import Api from './Api';

class App {
  constructor() {
    console.info('[App] initialize...');
    this.contacts = [];
    this.selectedContact = null;
    this.api = new Api();
    this.attachEvents();
  }

  renderContact(contact) {
    const tbody = document.querySelector('#contacts-list tbody');
    const row = document.createElement('tr');
    row.setAttribute('contact-uid', contact.uid);

    const createdAt = new Date(contact.createdAt).toLocaleString();
    row.innerHTML = `<td contact-attr="firstName">${contact.firstName}</td> \
    <td contact-attr="lastName">${contact.lastName}</td> \
    <td contact-attr="age">${contact.age}</td> \
    <td contact-attr="email">${contact.email}</td> \
    <td contact-attr="mobile">${contact.mobile}</td> \
    <td contact-attr="createdAt">${createdAt}</td> \
    <td> \
    <button class="btn btn-primary contact-update">update</button> \
    <button class="btn btn-danger contact-delete">delete</button> \
    </td>`;

    tbody.appendChild(row);
    tbody.querySelector(`tr[contact-uid="${contact.uid}"] .contact-update`)
    .addEventListener('click', this.selectedHandler.bind(this, contact));
    tbody.querySelector(`tr[contact-uid="${contact.uid}"] .contact-delete`)
    .addEventListener('click', this.removeHandler.bind(this, contact.uid));

    return;
  }

  updateContactElement(contact) {
    const contactSelector = `#contacts-list tbody tr[contact-uid="${contact.uid}"]`;
    const contactElement = document.querySelector(contactSelector);
    const tds = [...contactElement.querySelectorAll('td[contact-attr]')];

    tds.forEach((td) => {
      td.innerHTML = contact[td.getAttribute('contact-attr')];
    });
  }

  removeContactElement(contactUid) {
    const contactsWrapper = document.querySelector('#contacts-list tbody');
    const element = contactsWrapper.querySelector(`tr[contact-uid="${contactUid}"]`);
    contactsWrapper.removeChild(element);
  }

  removeHandler(contactUid, event) {
    event.preventDefault();
    if (contactUid) {
      this.api.remove(contactUid);
    }
  }

  selectedHandler(contact, event) {
    event.preventDefault();
    this.selectedContact = contact;

    const form = document.querySelector('.form-contact');
    const inputs = [...form.querySelectorAll('input')];

    inputs.forEach((input) => {
      input.value = contact[input.getAttribute('name')];
    });
  }

  cleanForm() {
    this.selectedContact = null;

    const form = document.querySelector('.form-contact');
    const inputs = [...form.querySelectorAll('input')];

    inputs.forEach((input) => {
      input.value = null;
    });
  }

  cleanHandler(event) {
    event.preventDefault();
    this.cleanForm();
  }

  submitHandler(event) {
    event.preventDefault();

    const form = document.querySelector('.form-contact');
    const inputs = [...form.querySelectorAll('input')];

    const contactData = {};

    inputs.forEach((input) => {
      contactData[input.getAttribute('name')] = input.value;
    });

    if (!this.selectedContact) {
      this.api.save(contactData);
    } else {
      this.api.update(contactData);
    }

    this.cleanForm();
  }
  addContact(contact) {
    this.contacts.push(contact);
    this.renderContact(contact);
  }

  removeContact(contact) {
    const index = this.contacts.indexOf(contact);
    this.contacts = this.contacts.slice(index, 1);
    this.removeContactElement(contact.uid);
  }

  updateContact(contact) {
    for (const c of this.contacts) {
      if (c.uid === contact.uid) {
        Object.assign(c, contact);
        this.updateContactElement(c);
      }
    }
  }

  attachEvents() {
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
}

export default App;
