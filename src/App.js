/* eslint no-console: 0 */
import Api from './Api';

class App {
  constructor() {
    console.info('[App] initialize...');
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
    const tds = contactElement.querySelectorAll('td[contact-attr]');

    Array.prototype.forEach.call(tds, (td) => {
      td.innerHTML = contact[td.getAttribute('contact-attr')];
    });
  }

  removeContactElement(contactUid) {}

  removeHandler(contactUid, event) {}

  selectedHandler(contact, event) {}

  cleanForm() {}

  cleanHandler(event) {}

  submitHandler(event) {}
  addContact(contact) {}

  removeContact(contact) {}

  updateContact(contact) {}

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
