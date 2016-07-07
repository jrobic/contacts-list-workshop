class Contact {
  constructor(data) {
    const {
      uid = '',
      firstName = '',
      lastName = '',
      age = null,
      email = '',
      mobile = '',
      createdAt = null,
    } = data;

    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.mobile = mobile;
    this.createdAt = createdAt;
  }
}

export default Contact;
