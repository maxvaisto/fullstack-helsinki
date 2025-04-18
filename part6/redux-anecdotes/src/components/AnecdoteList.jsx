import {useDispatch, useSelector} from "react-redux";
import {voteAnecdote} from "../reducers/anecdoteReducer.js";


const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === "") {
      return state.anecdote
    }
    console.log('filter', state.filter)
    return state.anecdote.filter(anecdote => anecdote.content.includes(state.filter))
  })

    const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return <>
  {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </>
}

export default AnecdoteList