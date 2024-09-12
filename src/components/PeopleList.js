import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeopleThunk, createPersonThunk, deletePersonThunk } from '../redux/PeopleSlice';
import { Link } from 'react-router-dom';
import styles from './PeopleList.module.scss';

const PeopleList = () => {
    const dispatch = useDispatch();
    const people = useSelector((state) => state.people.list);
    const status = useSelector((state) => state.people.status);
    const error = useSelector((state) => state.people.error);

    const [persons, setPersons] = useState([{ name: '', age: '' }]);

    useEffect(() => {
        dispatch(fetchPeopleThunk());
    }, [dispatch]);

    const handleAddPerson = () => {
        if (persons.every((person) => person.name && person.age)) {
            const newPersons = persons.map(person => ({ name: person.name, age: parseInt(person.age, 10) }));
            dispatch(createPersonThunk(newPersons))
                .then(() => setPersons([{ name: '', age: '' }]))
                .catch(err => console.error('Failed to add person:', err));
        } else {
            alert('Please fill in all fields before adding.');
        }
    };

    const handleDeletePerson = (id) => {
        dispatch(deletePersonThunk(id)).catch(err => console.error('Failed to delete person:', err));
    };

    const handleAddFields = () => {
        if (persons.every((person) => person.name && person.age)) {
            setPersons([...persons, { name: '', age: '' }]);
        } else {
            alert('Please fill in all existing fields before adding new ones.');
        }
    };

    const handleChange = (index, field, value) => {
        const newPersons = [...persons];
        newPersons[index][field] = value;
        setPersons(newPersons);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>People List</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}

            <ul className={styles.list}>
                {people.map((person) => (
                    <li key={person._id}>
                        <Link to={`/person/${person._id}`} className={styles.personInfo}>
                            Name: {person.name} - {person.age} years old
                        </Link>
                        <button
                            onClick={() => handleDeletePerson(person._id)}
                            className={`${styles.deleteButton} ${styles.button}`}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {persons.map((person, index) => (
                <div key={index} className={styles.formGroup}>
                    <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Name"
                        value={person.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                    />
                    <input
                        type="number"
                        className={styles.inputField}
                        placeholder="Age"
                        value={person.age}
                        onChange={(e) => handleChange(index, 'age', e.target.value)}
                    />
                </div>
            ))}

            <div className={styles.buttonGroup}>
                <button onClick={handleAddFields} className={`${styles.button} ${styles.addNew}`}>Other Person</button>
                <button onClick={handleAddPerson} className={`${styles.button} ${styles.add}`}>Add Person</button>
            </div>
        </div>
    );
};

export default PeopleList;
