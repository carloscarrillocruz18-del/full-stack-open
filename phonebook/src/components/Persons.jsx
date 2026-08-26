const Persons = ({ persons, searchFilter }) => {
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  )

  return (
    <div>
      {personsToShow.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default Persons