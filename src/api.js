export const fetchPeople = async () => {
    const response = await fetch('http://localhost:3001/api/persons');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const createPerson = async (person) => {
    const response = await fetch('http://localhost:3001/api/persons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const deletePerson = async (id) => {
    const response = await fetch(`http://localhost:3001/api/persons/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
};
