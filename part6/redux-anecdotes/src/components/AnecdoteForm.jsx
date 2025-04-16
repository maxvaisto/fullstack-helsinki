import { useDispatch } from 'react-redux'
import {createAnecdote} from "../reducers/anecdoteReducer.js";


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnnecdote = (event) => {
    event.preventDefault()
    console.log('create', event)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
}

  return <>
      <h2>create new</h2>
      <form onSubmit={addAnnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
  </>
}

export default AnecdoteForm