export const fetchPeople = async () => {
    const response = await fetch('http://localhost:3001/api/people');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

export const createPerson = async (person) => {
    const response = await fetch('http://localhost:3001/api/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

export const deletePerson = async (id) => {
    const response = await fetch(`http://localhost:3001/api/people/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
};
