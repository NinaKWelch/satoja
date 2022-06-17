import { Link } from "react-router-dom"
import EventInfo from "../events/EventInfo"

const EventCard = ({ event, linkTo }) => (
  <Link to={linkTo} className="text-decoration-none text-dark">
    <div className="border border-secondary rounded bg-light p-3">
      <EventInfo
        market={event.market}
        event={event}
        omitMarketName={true}
        omitDate={true}
      />
    </div>
  </Link>
)

export default EventCard
