import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Cargar todos los países al iniciar
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setSelectedCountry(null) // Resetear selección manual al escribir
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div>
        find countries <input value={searchQuery} onChange={handleSearchChange} />
      </div>

      {/* Si hay demasiados países */}
      {filteredCountries.length > 10 && searchQuery !== '' && (
        <p>Too many matches, specify another filter</p>
      )}

      {/* Si hay entre 2 y 10 países */}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && !selectedCountry && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3} style={{ marginBottom: '5px' }}>
              {country.name.common}{' '}
              <button onClick={() => setSelectedCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      )}

      {/* Si solo queda 1 país o se hizo clic en "show" */}
      {(filteredCountries.length === 1 || selectedCountry) && (
        <CountryDetail country={selectedCountry || filteredCountries[0]} />
      )}
    </div>
  )
}

// Componente para mostrar los detalles del país y su clima (Tarea 2.20)
const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital ? country.capital[0] : null
  const api_key = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    if (capital && api_key) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      axios
        .get(weatherUrl)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.log('Error fetching weather data', error)
        })
    }
  }, [capital, api_key])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {capital}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width="150"
        style={{ border: '1px solid #ccc', marginTop: '10px' }}
      />

      {capital && (
        <div>
          <h3>Weather in {capital}</h3>
          {weather ? (
            <div>
              <p>temperature {weather.main.temp} Celcius</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App