import { useEffect, useState } from 'react'
import { skleraSDK } from '@sklera/sdk'
import { fetchDepartures, Departure } from './services/wienerLinienService'
import DeparturesList from './components/DeparturesList'

function App() {
  const [departures, setDepartures] = useState<Departure[]>([])
  const [error, setError] = useState<string | null>(null)

  const updateDepartures = async () => {
    try {
      const data1 = await fetchDepartures('3445')
      const data2 = await fetchDepartures('3448')

      const sortedDepartures = [...data1, ...data2].sort(
        (a, b) => a.countdown - b.countdown
      )

      setDepartures(sortedDepartures)
    } catch (error) {
      setError(`Fehler beim Abrufen der Abfahrtszeiten: ${error}`)
    }
  }

  useEffect(() => {
    skleraSDK.loaded(function (screenData: any, appConfig: any) {
      console.log('SDK ready!')
      console.log(screenData)
      console.log('runtime config:', appConfig)
    })

    updateDepartures()

    const interval = setInterval(updateDepartures, 60000)
    return () => clearInterval(interval)
  }, [])

  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <h1>Krakauer Straße</h1>
      <DeparturesList departures={departures} />
    </div>
  )
}

export default App
