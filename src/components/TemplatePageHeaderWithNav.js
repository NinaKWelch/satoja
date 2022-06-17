import { useHistory } from "react-router-dom"
import { ReactComponent as LeftArrowIcon } from "../media/arrow-left-circle-fill.svg"
import { ReactComponent as ShareIcon } from "../media/share-fill.svg"
import Nav from "react-bootstrap/Nav"

const TemplatePageHeaderWithNav = ({ pageHeader, shareLink, handleShow }) => {
  const history = useHistory()

  // check if user is navigating internally
  // if user comes to the page vial link or direct url
  // teh back link goes to home page
  const handleBackButton = () => {
    history.location.key ? history.goBack() : history.push("/")
  }

  return (
    <Nav className="d-flex flex-nowrap pt-2">
      <Nav.Item>
        <Nav.Link
          className="pl-0 text-dark"
          onClick={() => handleBackButton()}
          aria-label={
            history.location.key
              ? "Palaa edelliselle sivulle"
              : "Mene satoja.fi kotisivulle"
          }
        >
          <LeftArrowIcon width="42" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="flex-grow-1 text-center"
        style={{ paddingRight: !shareLink && 58, paddingTop: "0.8rem" }}
      >
        <h2 className="mb-0 text-break text-capitalize">{pageHeader}</h2>
      </Nav.Item>
      {shareLink && (
        <Nav.Item style={{ paddingTop: "0.3rem" }}>
          <Nav.Link
            className="pr-0 text-dark"
            aria-label="Jaa sosiaalisessa mediassa"
            onClick={handleShow}
          >
            <ShareIcon width="32" />
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  )
}

export default TemplatePageHeaderWithNav
