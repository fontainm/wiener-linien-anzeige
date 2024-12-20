import { useEffect, useState } from 'react'
import { skleraSDK } from '@sklera/sdk'
import { fetchDepartures, Departure } from './services/wienerLinienService'

function App() {
  const [departures, setDepartures] = useState<Departure[]>([])

  const updateDepartures = async () => {
    try {
      const data = await fetchDepartures('3445')
      setDepartures(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    skleraSDK.loaded().then(console.log).catch(console.error)
    updateDepartures()
  }, [])

  return (
    <div>
      <h1>Wiener Linien Anzeige</h1>
    </div>
  )
}

export default App
