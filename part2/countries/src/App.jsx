import './index.css'
import React, {useEffect, useState} from 'react'
import countryService from './services/countries.js'
import {Filter} from './components/Filter.jsx'
import {RenderCountries} from "./components/RenderCountries.jsx";


function App() {

  const [countries, setcountries] = useState([])
  const [filter, setFilter] = useState('')
  const [targetCountry, setTargetCountry] = useState([])
  const [clickedCountry, setClickedCountry] = useState(null)

  useEffect(() => {
    console.log('Fetch all countries')
    countryService
      .getAll()
      .then(response => {
        console.log('Country list promise fulfilled')
        setcountries(response)
        setTargetCountry(response)
      })
  }, [])
  console.log('activated with', countries.length, 'countries')

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
  useEffect(() => {
    console.log('Filter countries')
      if (clickedCountry || filteredCountries.length === 1) {
        console.log('Fetch country information')
      const targetCountry = clickedCountry ? clickedCountry : filteredCountries[0]
        console.log('Get country information for', targetCountry)
      countryService
        .search(targetCountry.name.common)
        .then(response => {
          console.log('Country promise fulfilled')
          console.log('New target country', response)
          countryService
            .getLocation(response.capital[0], response.cca2)
            .then(location => {
              console.log('Location promise fulfilled')
              console.log('Fetching weather for the country')
              countryService
                .getLocalWeather(location[0].lat, location[0].lon)
                .then(weather_response => {
                  console.log('Weather promise fulfilled')
                  response.weather = weather_response
                  response.weather.icon_url = `https://openweathermap.org/img/wn/${weather_response.weather[0].icon}@2x.png`
                  setTargetCountry([response])
                })
            })
        })
      }
      else if (filteredCountries.length > 1 || filteredCountries.length === 0) {
        setTargetCountry(filteredCountries)
      }
      if (clickedCountry){
        console.log('Reset clicked country')
        setClickedCountry(null)
      }

    }, [filter, clickedCountry])


  return (
    <>
      <Filter filter={filter} setFilter={setFilter}/>
      <RenderCountries targetCountry={targetCountry} setClickedCountry={setClickedCountry}/>
    </>
  )
}

export default App
