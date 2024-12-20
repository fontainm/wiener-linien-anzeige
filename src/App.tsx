import { useEffect, useState } from 'react'
import { skleraSDK } from '@sklera/sdk'
import { fetchDepartures, Departure } from './services/wienerLinienService'
import DeparturesList from './components/DeparturesList'

function App() {
  const [departures, setDepartures] = useState<Departure[]>([])

  const updateDepartures = async () => {
    try {
      const data1 = await fetchDepartures('3445')
      const data2 = await fetchDepartures('3448')

      const sortedDepartures = [...data1, ...data2].sort(
        (a, b) => a.countdown - b.countdown
      )

      setDepartures(sortedDepartures)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    skleraSDK
      .loaded()
      .then(() => {
        console.log('SDK ready!')
      })
      .catch((e) => {
        console.error(e)
      })
    updateDepartures()
  }, [])

  return (
    <div>
      <h1>Krakauer Straße</h1>
      <DeparturesList departures={departures} />
    </div>
  )
}

export default App
