const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateContactById(contactId, data) {
  const contacts = await listContacts();
  index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById
}