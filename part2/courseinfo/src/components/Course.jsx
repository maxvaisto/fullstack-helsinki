import {Part} from "./Part.jsx";
import {Total} from "./Total.jsx";
import {Header} from "./Header.jsx";

export const Course = ({course}) => {
    const total = course.parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
            <Header course={course.name}/>
            {course.parts.map(part => <Part key={part.id} part={part}/>)}
            <Total sumOfExercises={total}/>
        </div>
    )
}