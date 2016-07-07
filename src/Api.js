/* global firebase */
import config from './config';
import { randomUid } from './utils';
import Contact from './Contact';

class Api {
  constructor() {
    const firebaseDb = firebase.initializeApp(config.firebase);
    this.db = firebaseDb.database().ref('contacts');
  }
  update(contactData) {
    return this.db.child(`/${contactData.uid}`).update(contactData);
  }

  save(contactData) {
    const newUid = randomUid();
    contactData.createdAt = new Date().getTime();
    contactData.uid = newUid;

    return this.db.child(`/${newUid}`).set(contactData);
  }

  remove(contactUid) {
    return this.db.child(`/${contactUid}`).remove();
  }

  on(eventKind, callback) {
    this.db.on(eventKind, (childSnapshot) => {
      callback(new Contact(childSnapshot.val()));
    });
  }
}

export default Api;
