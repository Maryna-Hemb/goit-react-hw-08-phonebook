import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ContactForm } from '../components/contactPageComp/contactForm/ContactForm';
import { Filter } from '../components/contactPageComp/filter/Filter';
import { ContactList } from '../components/contactPageComp/contactList/ContactList';

const ContactsPage = () => {
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
      </Container>
    </React.Fragment>
  );
};
export default ContactsPage;
