import { useEffect, useState } from 'react'
import { skleraSDK } from '@sklera/sdk'
import { fetchDepartures, Departure } from './services/wienerLinienService'
import DeparturesList from './components/DeparturesList'

function App() {
  const [departures, setDepartures] = useState<Departure[]>([])
  const [error, setError] = useState<string | null>(null)

  const updateDepartures = async (stationIds: number[]) => {
    try {
      let stations: any[] = []

      const promises = stationIds.map(async (stationId: number) => {
        const data = await fetchDepartures(stationId)
        stations.push(...data)
      })

      await Promise.all(promises)

      const sortedDepartures = stations.sort(
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
      const stationIds = JSON.parse(appConfig.station)
      updateDepartures(stationIds)
    })
    
    // Anwendung wird mit sklera alle 60 Sekunden aktualisiert. Alternativ:
    // const interval = setInterval(updateDepartures, 60000)
    // return () => clearInterval(interval)
  }, [])

  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <h1>{departures[0]?.location}</h1>
      <DeparturesList departures={departures} />
    </div>
  )
}

export default App
