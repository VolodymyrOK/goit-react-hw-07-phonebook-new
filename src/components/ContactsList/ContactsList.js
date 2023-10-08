import { useDispatch, useSelector } from 'react-redux';
import { Filter } from 'components/Filter/Filter';
import {
  ContactList,
  ContactListItem,
  DelButton,
  HeadContacts,
  MessageAboutEmpty,
  Title,
} from './ContactsList.styled';
import { delContacts } from 'redux/operations';
import { selectContacts } from 'redux/contactsSlice';
import { selectFilter } from 'redux/filterSlice';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const contacts = list.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <HeadContacts>
        <Title>
          Contacts<sup>{list.length}</sup>
        </Title>
        <Filter />
      </HeadContacts>
      <ContactList>
        {contacts.length === 0 ? (
          <MessageAboutEmpty>No entries to display</MessageAboutEmpty>
        ) : (
          contacts.map(({ id, name, number }) => (
            <ContactListItem key={id}>
              <span>{name}:</span>
              <span>{number}</span>
              <span>
                <DelButton
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure?'))
                      dispatch(delContacts(id));
                  }}
                >
                  Delete
                </DelButton>
              </span>
            </ContactListItem>
          ))
        )}
      </ContactList>
    </>
  );
};
