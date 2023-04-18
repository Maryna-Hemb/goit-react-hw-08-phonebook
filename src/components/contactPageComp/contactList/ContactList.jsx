import { ContactListItem } from 'components/contactPageComp/contactListItem/ContactListItem';
import { List, ListItem } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getContactsItems, getFilterValue } from '../../../redux/selectors';

export const ContactList = () => {
  const contact = useSelector(getContactsItems);
  const filter = useSelector(getFilterValue);
  const filteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contact.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  const contactForRender = filteredContacts();

  return (
    <>
      <List>
        {contactForRender.length !== 0 ? (
          contactForRender.map(({ id, name, number }) => (
            <ListItem key={id}>
              <ContactListItem id={id} name={name} number={number} />
            </ListItem>
          ))
        ) : (
          <div style={{ fontSize: 22, color: 'grey', textAlign: 'center' }}>
            No contacts
          </div>
        )}
      </List>
    </>
  );
};
