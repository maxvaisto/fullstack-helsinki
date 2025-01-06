export const CountryDetails = ({country}) => {
  console.log('CountryDetails:', country)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" width="100" height="100"/>
      <h3>Weather in {country.capital[0]}</h3>
      <p><b>temperature:</b> {(country.weather.main.temp-273.15).toFixed(2)} Celsius</p>
      <img src={country.weather.icon_url} alt="Weather icon"/>
      <p><b>wind:</b> {country.weather.wind.speed} m/s, direction {country.weather.wind.deg} degrees</p>
    </div>
  )
}