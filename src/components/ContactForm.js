import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { handleMail } from "../actions/mail"
import Button from "react-bootstrap/Button"
import FormFieldText from "./FormFieldText"
import FormFieldTextArea from "./FormFieldTextArea"
import FormFieldEmail from "./FormFieldEmail"
import FormErrorMessage from "./FormErrorMessage"

const mailSchema = Yup.object().shape({
  firstname: Yup.string().required("Nimi edellytetään"),
  email: Yup.string().email("Virhellinen sähköposti").required("Sähköposti edellytetään"),
  subject: Yup.string().required("Aihe edellytetään"),
  message: Yup.string().required("Viesti edellytetään"),
})

const ContactForm = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        firstname: user.firstname || "",
        email: user.email || "",
        subject: "",
        message: "",
      }}
      enableReinitialize={true}
      validationSchema={mailSchema}
      onSubmit={async (values, { resetForm }) => {
        const newMessage = {
          firstname: values.firstname,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }

        const status = await dispatch(handleMail(newMessage))

        if (status === 200) {
          resetForm({
            values: {
              subject: "",
              message: "",
            },
          })
        }
      }}
    >
      {() => (
        <Form>
          <Field name="firstname" id="name" label="Nimi" component={FormFieldText} />
          <ErrorMessage name="firstname" component={FormErrorMessage} />
          <Field name="email" id="email" label="Sähköposti" component={FormFieldEmail} />
          <ErrorMessage name="email" component={FormErrorMessage} />
          <Field name="subject" id="subject" label="Otsikko" component={FormFieldText} />
          <ErrorMessage name="subject" component={FormErrorMessage} />
          <Field
            name="message"
            id="message"
            label="Viesti"
            component={FormFieldTextArea}
            rows="3"
          />
          <ErrorMessage name="message" component={FormErrorMessage} />
          <Button type="submit" variant="success" size="lg" className="w-100 mb-2">
            Lähetä viesti
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default ContactForm
