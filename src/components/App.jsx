import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const locStorageData = JSON.parse(localStorage.getItem('contacts'));
  //   setContacts(() => [...locStorageData]);
  // }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHundler = data => {
    let nameArray = [];
    nameArray = contacts.map(value => value.name);
    if (!nameArray.includes(data.name)) {
      let arrayCont = [];
      arrayCont = [
        ...contacts,
        { id: nanoid(), name: data.name, number: data.number },
      ];
      return setContacts(arrayCont);
    } else {
      alert(`${data.name} is already in your contacts`);
    }
  };

  const elementDelete = (arr, idContact) => {
    let newArr = arr.filter(elem => elem.id !== idContact);
    return newArr;
  };

  const deleteContactFromContactList = idContact => {
    let newArrAfterDel = elementDelete(contacts, idContact);
    setContacts([...newArrAfterDel]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const showContact = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHundler} />
      <h2 className={css.title}>Constacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={showContact()}
        del={deleteContactFromContactList}
      />
    </div>
  );
};
