/**
 * Find the indices of emails matching a search term
 * @param emails    array of emails to search through and reference the index of
 * @param searchVal the value we are searching for in the emails array
 * @returns         an array of indices that match the search term
 * @author Bivash Pandey
 */
export default function filterEmails(emails, searchVal) {
  // if no search term, then render all
  if (searchVal.length === 0) {
    return [...Array(emails.length).keys()];
  }

  const indices = [];

  emails.forEach((email, index) => {
    // subject search
    if (email.subject.toLowerCase().includes(searchVal.toLowerCase())) {
      indices.push(index);
      return;
    }

    // body search
    if (email.body.toLowerCase().includes(searchVal.toLowerCase())) {
      indices.push(index);
      return;
    }

    // address search
    const addresses = [
      email.from.email,
      ...email.to.map((to) => to.email),
      ...email.cc.map((cc) => cc.email),
    ];
    for (const addr of addresses) {
      if (addr.toLowerCase().includes(searchVal.toLowerCase())) {
        indices.push(index);
        return;
      }
    }
  });

  return indices;
}
