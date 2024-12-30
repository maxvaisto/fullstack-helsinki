import {Number} from "./Number.jsx";

export const Numbers = ({people}) => {
  return (
    <div>
      {people.map(person =>
        <Number key={person.id} person={person}/>
      )}
    </div>
  )
}