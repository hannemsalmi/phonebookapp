import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Persons = (props) => {
  return(
  <ul>
      {props.personstoshow.map(person => <Person key={person.name} person={person} />
      )}
      </ul>
      )
}

const Filter = (props) => {
return (
<div>
filter shown with<input
value={props.filter}
onChange={props.handle} />
</div>
)
}

const PersonForm = (props) => {
  return(
<form onSubmit={props.addperson}>
        <div>
          name: <input 
          value={props.newname}
          onChange={props.namechange}/>
        <div>number: <input 
        value={props.newnumber}
        onChange={props.numberchange}/>
        </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      )
    }

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.includes(newFilter))

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else{
    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
}
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handle={handleFilterChange}/>
      <PersonForm addperson={addPerson} newname={newName} namechange={handleNameChange} 
      newnumber={newNumber} numberchange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personstoshow={personsToShow}/>
    </div>
  )
}

export default App