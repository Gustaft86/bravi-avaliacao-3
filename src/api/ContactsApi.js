export const createContact = async (person, contact) => {
    console.log(JSON.stringify({ ...contact, person }))
    const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, person }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    return data;
};

export const updateContact = async (contactId, contact) => {
    const response = await fetch(`http://localhost:3001/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

export const deleteContact = async (contactId) => {
    const response = await fetch(`http://localhost:3001/api/contacts/${contactId}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
};

export const fetchContacts = async (personId) => {
    const response = await fetch(`http://localhost:3001/api/contacts?personId=${personId}`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    const data = await response.json();
    return data;
};
