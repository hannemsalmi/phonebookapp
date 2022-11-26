import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person, deleteperson }) => {
  return (
    <li>{person.name} {person.number}  <button onClick={(e)=>{e.stopPropagation();deleteperson(person.id);}}>delete</button></li>
  )
}

const Persons = (props) => {
  return(
  <ul>
      {props.personstoshow.map(person => <Person key={person.name} person={person} deleteperson={props.deleteperson}/>
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.includes(newFilter))

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (persons.some(e => e.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number: newNumber}
      personService
      .update(changedPerson.id, changedPerson).then(response => {
        setPersons(persons.map(person => person.name !== newName ? person : response.data))
      })
    }
  }
    else{
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
    setNewNumber('')
    })
  }
}

const deletePerson = (id) => {
  const persontodelete = persons.find(p => p.id === id)
  console.log('delete clicked')
  if(window.confirm(`Delete ${persontodelete.name}?`)) {
  personService
  .deleteOne(id)
  .then(setPersons(persons.filter(p => p.id !== id)))
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
      <Persons personstoshow={personsToShow} deleteperson={deletePerson}/>
    </div>
  )
}

export default App