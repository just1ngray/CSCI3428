export function contact(contact) {
    if (contact === undefined) return "";
    return `${contact.name} <${contact.email}>`;
}

export function contacts(contacts) {
    if (contacts === undefined) return "";
    return contacts.map(c => contact(c)).join(", ");
}