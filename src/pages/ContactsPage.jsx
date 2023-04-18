import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ContactForm } from '../components/contactPageComp/contactForm/ContactForm';
import { Filter } from '../components/contactPageComp/filter/Filter';
import { ContactList } from '../components/contactPageComp/contactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIsLoading, getError } from '../redux/selectors';
import { fetchContacts } from '../redux/contactsTask/operations';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: '#cfe8fc',
          height: '100vh',
          position: 'relative',
          paddingTop: 7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 36, marginTop: 0 }}>Phonebook</h1>
        <ContactForm />
        <h2 style={{ fontSize: 32, marginTop: 36, marginBottom: 0 }}>
          Contacts
        </h2>
        <Filter />
        <ContactList />
        <div>{isLoading && !error && <b>Request in progress...</b>}</div>
      </Container>
    </React.Fragment>
  );
};
export default ContactsPage;
