// src/components/PeopleList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPeople, addPerson, removePerson, setStatus, setError } from '../redux/peopleSlice';
import { fetchPeople, createPerson, deletePerson } from '../api';

const PeopleList = () => {
    const dispatch = useDispatch();
    const people = useSelector((state) => state.people.list);
    const status = useSelector((state) => state.people.status);
    const error = useSelector((state) => state.people.error);

    useEffect(() => {
        const loadPeople = async () => {
            try {
                dispatch(setStatus('loading'));
                const data = await fetchPeople();
                dispatch(setPeople(data));
                dispatch(setStatus('succeeded'));
            } catch (err) {
                dispatch(setError(err.toString()));
                dispatch(setStatus('failed'));
            }
        };

        loadPeople();
    }, [dispatch]);

    const handleAddPerson = async () => {
        const newPerson = { name: 'New Person', age: 30 };
        try {
            const person = await createPerson(newPerson);
            dispatch(addPerson(person));
        } catch (err) {
            dispatch(setError(err.toString()));
        }
    };

    const handleDeletePerson = async (id) => {
        try {
            await deletePerson(id);
            dispatch(removePerson(id));
        } catch (err) {
            dispatch(setError(err.toString()));
        }
    };

    return (
        <div>
            <h1>People List</h1>
            {console.log(people)}
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            <ul>
                {people.map((person) => (
                    <li key={person._id}>
                        {person.name} - {person.age}
                        <button onClick={() => handleDeletePerson(person._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddPerson}>Add Person</button>
        </div>
    );
};

export default PeopleList;
