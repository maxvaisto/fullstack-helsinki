import axios from 'axios'
const countryBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const geoBaseUrl = 'http://api.openweathermap.org/geo/1.0/direct'

const getAll = () => {
  console.log("Getting all countries", countryBaseUrl)
  const request = axios.get(`${countryBaseUrl}/all`)
  return request.then(response => response.data)
}

const search = (name) => {
  const request = axios.get(`${countryBaseUrl}/name/${name}`)
  return request.then(response => response.data)
}


const getLocalWeather = (lat, lon) => {
  const API_KEY = import.meta.env.VITE_API_KEY
  const request = axios.get(`${weatherBaseUrl}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  return request.then(response => response.data)
}

const getLocation = (city, countryCode) => {
  console.log("Getting location for", city, countryCode)
  const API_KEY = import.meta.env.VITE_API_KEY
  const request = axios.get(`${geoBaseUrl}?q=${city},${countryCode}&appid=${API_KEY}`)
  return request.then(response => response.data)
}



export default { getAll, search , getLocalWeather, getLocation }