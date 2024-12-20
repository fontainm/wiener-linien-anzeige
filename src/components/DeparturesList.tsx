import { Departure } from '../services/wienerLinienService'

interface DepartureListProps {
  departures: Departure[]
}

const DepartureList: React.FC<DepartureListProps> = ({ departures }) => {
  return (
    <div className="departures">
      <div className="departures">
        <div className="departure-header">
          <div className="departure-wrapper">
            <div>Linie</div>
            <div>Ziel</div>
            <div>Abfahrt</div>
          </div>
        </div>
        {departures.map((departure, index) => (
          <div key={index} className="departure-item">
            <div className="departure-wrapper">
              <div>{departure.line}</div>
              <div>{departure.destination}</div>
              <div>{departure.countdown}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DepartureList
