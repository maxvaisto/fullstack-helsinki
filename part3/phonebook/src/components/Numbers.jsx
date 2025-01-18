import {Number} from "./Number.jsx";

export const Numbers = ({people, removePerson}) => {
  return (
    <div>
      {people.map(person =>
        <Number key={person.id} person={person} removePerson={removePerson}/>
      )}
    </div>
  )
}