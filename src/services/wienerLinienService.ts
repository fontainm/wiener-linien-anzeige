export interface Departure {
  location: string
  line: string
  destination: string
  countdown: number
}

const API_BASE_URL =
  'https://eogrkqip9l.execute-api.eu-west-1.amazonaws.com/monitor'

export const fetchDepartures = async (stopId: number): Promise<Departure[]> => {
  const response = await fetch(`${API_BASE_URL}?stopId=${stopId}`)

  if (!response.ok) {
    throw new Error(`Error fetching data for stop ${stopId}`)
  }

  const data = await response.json()
  const departures = data.data.monitors[0]?.lines[0]?.departures.departure || []

  return departures.map((departure: any) => ({
    location: data.data.monitors[0]?.locationStop?.properties?.title,
    line: departure.vehicle.name,
    destination: departure.vehicle.towards,
    countdown: departure.departureTime.countdown,
  }))
}
