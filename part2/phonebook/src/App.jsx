import { useState, useEffect } from 'react'
import {Numbers} from "./components/Numbers.jsx";
import {Form} from "./components/Form.jsx";
import {Filter} from "./components/Filter.jsx";
import {Notification} from "./components/Notification.jsx";
import {Error} from "./components/Error.jsx";
import personService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [addMessage, setAddMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name === newName)) {
      const personObject = {
          name: newName,
          number: newNumber,
          id: '' + (persons.length + 1),
      }
      setPersons(persons.concat(personObject))
      personService
        .create(personObject)
        .then(response => {
      console.log(response)
      setAddMessage(
          `Added '${personObject.name}'`
        )
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
    })
      setNewName('')
      setNewNumber('')
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        console.log("Found name", newName, person)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(response => {
            console.log(response)
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
          })
          .catch(error => {
            console.log(error)
            setErrorMessage(
              `Information of '${newName}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== changedPerson.id))

          })

        setNewName('')
        setNewNumber('')
      }
    }
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage}/>
      <Error message={errorMessage}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Numbers people={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))} removePerson={removePerson}/>
    </div>
  )
}

export default App