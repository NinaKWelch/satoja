import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { notifySuccess, notifyError } from "../../actions/notification"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FormPasswordReset from "../login/FormPasswordReset"

const axios = require("axios")

const PasswordPageNew = (/*props*/) => {
  const { actionID } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const changePassword = async (psw) => {
    const body = {
      password: psw,
      id: actionID,
    }
    axios({
      url: "/api/users/reset_password",
      data: body,
      method: "patch",
    }).then((response) => {
      if (response.status === 200) {
        dispatch(notifySuccess("Onnistuit vaihtamaan salasanasi!"))
        history.goBack()
      } else {
        dispatch(notifyError("Tarkista, että sähköpostisi on oikein ja yritä uudelleen"))
      }
    })
  }

  return (
    <Row as="main" className="pt-5">
      <Col xs={12} className="text-center">
        <h2>Luo uusi salasana</h2>
        <p className="fs-6">Salasanan minimipituus on 8 merkkiä.</p>
      </Col>
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 4, offset: 4 }}
      >
        <FormPasswordReset handleChangePassword={changePassword} />
      </Col>
    </Row>
  )
}

export default PasswordPageNew
