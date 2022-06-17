import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"

const LandingPage = () => (
  <Row className="h-100 bg-field align-content-center text-center">
    <Col xs={12} className="sign-base">
      <div className="mb-4 sign" aria-label="Renki rekoille">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244 68.04" width="200">
          <g transform="translate(-43.746 -40.628)">
            <g
              transform="translate(46.746 43.628)"
              fill="#6b3529"
              stroke="#fff"
              strokeWidth="3"
            >
              <rect width="238" height="62.04" rx="7" stroke="none" />
              <rect x="-1.5" y="-1.5" width="241" height="65.04" rx="8.5" fill="none" />
            </g>
            <text
              transform="translate(74.159 50.624)"
              fill="#fff"
              fontSize="20"
              fontFamily="Work Sans"
              fontWeight="500"
            >
              <tspan x="15" y="30">
                RENKI REKOILLE
              </tspan>
            </text>
          </g>
        </svg>
      </div>
      <div className="vertical-line"></div>
    </Col>
    <Col className="sign-base">
      <Nav className="p-0 flex-column align-items-center">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={"/map"}
            aria-label="Ostan lähiruokaa"
            className="sign sign-right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 343.406 78.281"
              width="275"
            >
              <defs>
                <filter
                  id="a"
                  x="0"
                  y="0"
                  width="343.406"
                  height="78.281"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="2" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feFlood floodOpacity="0.451" />
                  <feComposite operator="in" in2="b" />
                  <feComposite in="SourceGraphic" />
                </filter>
              </defs>
              <g transform="translate(6 4)">
                <g transform="matrix(1, 0, 0, 1, -6, -4)" filter="url(#a)">
                  <g transform="translate(6 4)" fill="#005db8">
                    <path
                      d="M 329.90625 64.78125 L 37.38915634155273 64.78125 L 2.242397546768188 33.83563613891602 L 37.40773391723633 1.5 L 329.90625 1.5 L 329.90625 64.78125 Z"
                      stroke="none"
                    />
                    <path
                      d="M 37.99252319335938 2.999988555908203 L 4.48480224609375 33.81138610839844 L 37.9554443359375 63.2812614440918 L 328.40625 63.2812614440918 L 328.40625 2.999988555908203 L 37.99252319335938 2.999988555908203 M 36.82290649414062 -7.62939453125e-06 L 331.40625 -7.62939453125e-06 L 331.40625 66.28125762939453 L 36.82290649414062 66.28125762939453 L 0 33.85980606079102 L 36.82290649414062 -7.62939453125e-06 Z"
                      stroke="none"
                      fill="#fff"
                    />
                  </g>
                </g>
                <text
                  transform="translate(178.703 43.141)"
                  fill="#fff"
                  fontSize="25"
                  fontFamily="Work Sans"
                  fontWeight="500"
                >
                  <tspan x="-104.3" y="0">
                    Ostan lähiruokaa
                  </tspan>
                </text>
              </g>
            </svg>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-4">
          <Nav.Link
            as={Link}
            to={"/login"}
            aria-label="Myyn lähiruokaa"
            className="sign sign-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 343.406 78.281"
              width="275"
            >
              <defs>
                <filter
                  id="a"
                  x="0"
                  y="0"
                  width="343.406"
                  height="78.281"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="2" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feFlood floodOpacity="0.451" />
                  <feComposite operator="in" in2="b" />
                  <feComposite in="SourceGraphic" />
                </filter>
              </defs>
              <g transform="translate(6 4)">
                <g transform="matrix(1, 0, 0, 1, -6, -4)" filter="url(#a)">
                  <g transform="translate(6 4)" fill="#005db8">
                    <path
                      d="M 294.01708984375 64.78125 L 1.5 64.78125 L 1.5 1.5 L 293.9985046386719 1.5 L 329.1638488769531 33.83563613891602 L 294.01708984375 64.78125 Z"
                      stroke="none"
                    />
                    <path
                      d="M 3 2.999988555908203 L 3 63.2812614440918 L 293.4508056640625 63.2812614440918 L 326.9214477539062 33.81138610839844 L 293.4137268066406 2.999988555908203 L 3 2.999988555908203 M 0 -7.62939453125e-06 L 294.5833435058594 -7.62939453125e-06 L 331.40625 33.85980606079102 L 294.5833435058594 66.28125762939453 L 0 66.28125762939453 L 0 -7.62939453125e-06 Z"
                      stroke="none"
                      fill="#fff"
                    />
                  </g>
                </g>
                <text
                  transform="translate(148.703 42.141)"
                  fill="#fff"
                  fontSize="25"
                  fontFamily="Work Sans"
                  fontWeight="500"
                >
                  <tspan x="-100.05" y="0">
                    Myyn lähiruokaa
                  </tspan>
                </text>
              </g>
            </svg>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Button
            as={Link}
            to={"/login"}
            aria-label="Kirjaudu sisään"
            variant="success"
            size="lg"
            type="button"
            className="sign"
            style={{ width: 200 }}
            id="login-button"
          >
            Kirjaudu sisään
          </Button>
        </Nav.Item>
      </Nav>
      <div className="vertical-line"></div>
    </Col>
    <div className="vertical-line vertical-line-bottom"></div>
  </Row>
)

export default LandingPage
