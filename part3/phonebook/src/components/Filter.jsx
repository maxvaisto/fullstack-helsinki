export const Filter = ({filter, setFilter}) => {
  return (
    <p>filter shown with <input
      value={filter}
      onChange={(event) => setFilter(event.target.value)}/></p>
  )
}