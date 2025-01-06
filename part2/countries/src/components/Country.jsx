export const Country = ({country, setClickecCountry}) => {
  console.log('Country:', country)
  return (
    <div>
      <p>{country.name.common} <button onClick={() => {setClickecCountry(country)}}>show</button></p>
    </div>
  )
}