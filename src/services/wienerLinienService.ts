export interface Departure {
  line: string
  destination: string
  departureTime: Date
}

const API_BASE_URL = 'https://www.wienerlinien.at/ogd_realtime/monitor'

export const fetchDepartures = async (stopId: string): Promise<Departure[]> => {
  const response = await fetch(`${API_BASE_URL}?stopId=${stopId}`)

  if (!response.ok) {
    throw new Error(`Error fetching data for stop ${stopId}`)
  }

  const data = await response.json()
  const departures = data.data.monitors[0]?.lines[0]?.departures.departure || []

  return departures.map((departure: any) => ({
    line: data.data.monitors[0].lines[0].name,
    destination: departure.destination,
    departureTime: new Date(departure.departureTime.timePlanned),
  }))
}
