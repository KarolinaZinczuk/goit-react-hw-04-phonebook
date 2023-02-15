import { useState, useEffect } from "react";

import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import Notiflix from 'notiflix';


const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {

  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts")) ?? defaultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ id, name, number }) => {
    if (
      contacts.find(
        contacts => contacts.name.toLowerCase() === name.toLowerCase()
      )
    )
      return Notiflix.Notify.failure(`${name} is already in phonebook`);

    setContacts([...contacts, { id, name, number }]);
  };

  const removeContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getContacts = () => {
    const filterNormalize = filter.toLowerCase();
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filterNormalize)
    );
  };

  const filterContacts = e => {
    setFilter({ filter: e.target.value });
  };

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmitData={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={filterContacts} />
        <ContactList
          contacts={getContacts()}
          handleRemove={removeContact}
        />
      </div>
    </>
  );
};