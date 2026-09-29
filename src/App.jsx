import { useState } from 'react'
import Header from './components/Header.jsx'
import Current from './components/Current.jsx'
import Forecast from './components/Forecast.jsx'
import Footer from './components/Footer.jsx'

// Temperatures are stored in Celsius.
const weather = {
  city: 'Reykjavik',
  tempC: 21.66666,
  humidity: 50,
  icon: '/sun.png',
  forecast: [
    { day: 'Mon', tempC: 19 },
    { day: 'Tue', tempC: 3 },
    { day: 'Wed', tempC: -4 },
    { day: 'Thu', tempC: 0 },
  ],
}

export default function App() {
  const [unit, setUnit] = useState('C')
  // BUG (issue #7): leftover debug console.log
  console.log('debug: unit is', unit)

  // BUG (issue #1): Celsius→Fahrenheit conversion is wrong — it multiplies by 9/5 but
  // forgets to add 32, so every Fahrenheit reading is off.
  function toDisplay(tempC) {
    return unit === 'F' ? tempC * (9 / 5) : tempC
  }

  // BUG (issue #2): the toggle sets the unit back to the SAME value, so clicking does nothing.
  function toggleUnit() {
    setUnit(unit === 'C' ? 'C' : 'F')
  }

  return (
    <main className="card">
      <Header city={weather.city} icon={weather.icon} />
      <Current
        temp={toDisplay(weather.tempC)}
        unit={unit}
        humidity={weather.humidity}
        onToggle={toggleUnit}
      />
      <Forecast days={weather.forecast} toDisplay={toDisplay} unit={unit} />
      <Footer />
    </main>
  )
}
