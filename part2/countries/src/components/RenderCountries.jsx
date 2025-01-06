import {CountryDetails} from "./CountryDetails.jsx";
import {Country} from "./Country.jsx";
import React from "react";

export const RenderCountries = ({targetCountry, setClickedCountry}) => {
  if (targetCountry.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (targetCountry.length === 1) {
    return <CountryDetails country={targetCountry[0]}/>
  } else {
    return targetCountry.map(country => (
      <Country key={country.name.official} country={country} setClickecCountry={setClickedCountry}/>
    ))
  }
}