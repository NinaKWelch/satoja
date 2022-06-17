import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signOutUnauthedUser, handleLoginModal } from "../../actions/authedUser"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import SignUpFormFields from "./SignUpFormFields"
import SignUpFormTerms from "./SignUpFormTerms"

// validation for firstname and lastname
const re = /^[a-zåäöA-ZÅÄÖ]+(-[a-zåäöA-ZÅÄÖ]+)?$/

// Yup
const SharedSchema = {
  firstname: Yup.string()
    .min(1, "Minimipituus 1 kirjain")
    .max(25, "Maksimipituus 25 kirjainta")
    .required("Etunimi edellytetään")
    .matches(re, "Vain kirjaimet ja väliviivat ovat sallittuja")
    .trim("Ei voi alkaa tai päättyä välilyöntiin"),
  lastname: Yup.string()
    .min(2, "Minimipituus 2 kirjainta")
    .max(25, "Maksimipituus 25 kirjainta")
    .required("Sukunimi edellytetään")
    .matches(re, "Vain kirjaimet ja väliviivat ovat sallittuja")
    .trim("Ei voi alkaa tai päättyä välilyöntiin"),
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  phonenumber: Yup.string(),
  terms_ok: Yup.boolean()
    .test(
      "consent",
      "Edellytämme, että hyväksyt käyttöehtomme",
      (value) => value === true
    )
    .required("Tämä on oltava valittuna"),
}

const SignUpSchema = Yup.object().shape({
  ...SharedSchema,
  password: Yup.string()
    .min(8, "Salasanan minimipituus on 8 merkkiä")
    .required("Salasana edellytetään"),
})

const FacebookSignUpSchema = Yup.object().shape({
  ...SharedSchema,
  password: Yup.string(),
})

const SignUpForm = ({
  user,
  facebookSignUp,
  handleCreateNewUser,
  handleCreateNewFacebookUser,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loginModal = useSelector(({ loginModal }) => loginModal)

  // close modal and logout Facebook user
  const cancelSignUp = () => {
    // logout user who does not complete Facebook sign up
    facebookSignUp && dispatch(signOutUnauthedUser())
    // redrect user to home page if they are on register page
    history.location.pathname === "/register" && history.push("/")
    // close modal if open
    loginModal.show === true && dispatch(handleLoginModal(false, false, false))
  }

  return (
    <Row>
      <Col xs={12}>
        <Formik
          initialValues={{
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email ? (user.email !== "none" ? user.email : "") : "",
            phonenumber: "",
            password: "",
            terms_ok: false,
          }}
          enableReinitialize={true}
          validationSchema={facebookSignUp ? FacebookSignUpSchema : SignUpSchema}
          onSubmit={(values) => {
            const newUser = {
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              phonenumber: values.phonenumber,
            }

            user = { ...user, ...newUser }

            if (facebookSignUp) {
              handleCreateNewFacebookUser(user)
            } else {
              handleCreateNewUser({ password: values.password, ...newUser })
            }
          }}
        >
          {() => (
            <Form>
              <SignUpFormFields facebookSignUp={facebookSignUp} />
              <SignUpFormTerms />
              <Button variant="success" size="lg" type="submit" className="w-100 mb-2">
                {facebookSignUp ? "Viimeistele rekisteröityminen" : "Rekisteröidy"}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                type="button"
                className="w-100 mb-3"
                onClick={cancelSignUp}
              >
                Peruuta
              </Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

export default SignUpForm
