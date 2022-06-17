import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { notifySuccess, notifyError } from "../../actions/notification"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FormPasswordForgot from "../login/FormPasswordForgot"

const axios = require("axios")

const PasswordPageForgot = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const changePassword_new = async (emailAddress) => {
    const body = {
      email: emailAddress.toLowerCase(),
    }
    axios({
      url: "/api/auth/email/sent_password_reset_link",
      data: body,
      method: "post",
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(notifySuccess("Sähköposti lähetetty!"))
          history.goBack()
        }
      })
      .catch((resp) => {
        dispatch(notifyError("Tarkista, että sähköpostisi on oikein ja yritä uudelleen"))
      })
  }

  return (
    <Row as="main" className="pt-5">
      <Col xs={12} className="text-center">
        <h2>Unohtunut salasana</h2>
        <p className="fs-6">Linkki salasanasi vaihtoon lähetetään sähköpostiisi.</p>
      </Col>
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 4, offset: 4 }}
      >
        <FormPasswordForgot handleChangePassword={changePassword_new} />
      </Col>
    </Row>
  )
}

export default PasswordPageForgot
