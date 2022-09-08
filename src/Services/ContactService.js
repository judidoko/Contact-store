import Axios from "axios";

export class ContactService {
  static serverURL = "http://localhost:9000";

  /* =======Fetching all Data ======== */
  static getAllContacts() {
    let dataURL = `${this.serverURL}/contacts`;
    return Axios.get(dataURL);
  }
  /* =======Fetching view Data ======== */
  static getContact(contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return Axios.get(dataURL);
  }

  /* =======Fetching Group Data ======== */
  static getGroups() {
    let dataURL = `${this.serverURL}/groups`;
    return Axios.get(dataURL);
  }

  /* =======Fetching GroupId Data ======== */
  static getGroup(contact) {
    let groupId = contact.groupId;
    let dataURL = `${this.serverURL}/groups/${groupId}`;
    return Axios.get(dataURL);
  }

  /* ======= create data from form and sending it to Database ======== */
  static createContact(contact) {
    let dataURL = `${this.serverURL}/contacts`;
    return Axios.post(dataURL, contact);
  }

  /* ======= Update data to Database ======== */

  static updateContact(contact, contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return Axios.put(dataURL, contact);
  }

  /* ======= Delete data from Database ======== */

  static deleteContact(contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return Axios.delete(dataURL);
  }
}
