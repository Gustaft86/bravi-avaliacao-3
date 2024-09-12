import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchContactsByPersonIdThunk,
    createContactThunk,
    updateContactThunk,
    deleteContactThunk,
} from '../redux/ContactSlice';
import styles from './PersonDetails.module.scss';

const PersonDetails = () => {
    const { personId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contacts = useSelector((state) => state.contacts.list);
    const status = useSelector((state) => state.contacts.status);
    const error = useSelector((state) => state.contacts.error);

    const [newContact, setNewContact] = useState({ type: 'email', value: '' });
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        dispatch(fetchContactsByPersonIdThunk(personId));
    }, [dispatch, personId]);

    const handleAddContact = () => {
        if (newContact.value) {
            dispatch(createContactThunk({ personId, contact: newContact })).then(() => {
                setNewContact({ type: 'email', value: '' });
            });
        } else {
            alert('Please provide contact information.');
        }
    };

    const handleEditContact = (contact) => {
        setEditingContact(contact);
    };

    const handleUpdateContact = () => {
        if (editingContact && editingContact.value) {
            dispatch(updateContactThunk(editingContact)).then(() => {
                setEditingContact(null);
            });
        } else {
            alert('Please provide updated contact information.');
        }
    };

    const handleDeleteContact = (contactId) => {
        dispatch(deleteContactThunk(contactId));
    };

    const handleCancelEdit = () => {
        setEditingContact(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Person Details</h1>
            {status === 'loading' && <p>Loading contacts...</p>}
            {status === 'failed' && <p>Error: {error}</p>}

            <div className={styles.newContactForm}>
                <select
                    value={newContact.type}
                    onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
                    className={styles.select}
                >
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Phone</option>
                </select>
                <input
                    type="text"
                    placeholder="Contact Information"
                    value={newContact.value}
                    onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                    className={styles.inputField}
                />
                <button onClick={handleAddContact} className={`${styles.addButton} ${styles.button}`}>
                    Add Contact
                </button>
            </div>

            <ul className={styles.contactList}>
                {contacts.map((contact) => (
                    <li key={contact._id} className={styles.contactItem}>
                        {editingContact && editingContact._id === contact._id ? (
                            <>
                                <select
                                    value={editingContact.type}
                                    onChange={(e) => setEditingContact({ ...editingContact, type: e.target.value })}
                                    className={styles.select}
                                >
                                    <option value="email">Email</option>
                                    <option value="whatsapp">WhatsApp</option>
                                    <option value="phone">Phone</option>
                                </select>
                                <input
                                    type="text"
                                    value={editingContact.value}
                                    onChange={(e) => setEditingContact({ ...editingContact, value: e.target.value })}
                                    className={styles.inputField}
                                />
                                <div className={styles.buttonGroup}>
                                    <button onClick={handleUpdateContact} className={`${styles.saveButton} ${styles.button}`}>
                                        Save
                                    </button>
                                    <button onClick={handleCancelEdit} className={`${styles.cancelButton} ${styles.button}`}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.contactInfo}>
                                    <span>Type: {contact.type}</span>
                                    <span>Contact: {contact.value}</span>
                                </div>
                                <div className={styles.buttonGroup}>
                                    <button onClick={() => handleEditContact(contact)} className={`${styles.editButton} ${styles.button}`}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteContact(contact._id)} className={`${styles.deleteButton} ${styles.button}`}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={() => navigate('/')} className={styles.backButton}>
                Back to People List
            </button>
        </div>
    );
};

export default PersonDetails;
