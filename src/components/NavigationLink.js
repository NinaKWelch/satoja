import { Link, useHistory } from "react-router-dom"
import Nav from "react-bootstrap/Nav"

const NavigationLink = ({ id, url, children }) => {
  const history = useHistory()

  // keep link in active state
  // when user is at the location
  const handleActiveLink = (str) => {
    const path = history.location.pathname

    if (str === path || (path.includes(str) && str !== "/")) {
      return true
    } else {
      return false
    }
  }

  return (
    <Nav.Link
      id={id}
      as={Link}
      to={url}
      className="bottom-nav-link"
      active={handleActiveLink(url)}
    >
      <div className="d-flex flex-column justify-content-center align-items-center bottom-nav-item">
        {children}
      </div>
    </Nav.Link>
  )
}

export default NavigationLink
