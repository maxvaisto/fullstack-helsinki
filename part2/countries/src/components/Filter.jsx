export const Filter = ({filter, setFilter}) => {
  return (
    <div>
      find countries <input
      value={filter}
      onChange={(event) => setFilter(event.target.value)}/>
    </div>
  )
}