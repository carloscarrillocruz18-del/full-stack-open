const Persons = ({ persons, searchFilter, handleDelete }) => {
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  )

  return (
    <div>
      {personsToShow.map(person => (
        <p key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default Persons