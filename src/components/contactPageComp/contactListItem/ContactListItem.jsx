import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

import { deleteContact } from '../../../redux/contactsTask/operations';

export const ContactListItem = ({ id, number, name }) => {
  const dispatch = useDispatch();

  const onDeleteContact = () => dispatch(deleteContact(id));
  return (
    <>
      {name}: {number}
      <IconButton
        aria-label="delete"
        type="button"
        onClick={() => onDeleteContact(id)}
        size="large"
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
