import Form from "react-bootstrap/Form"

const FormFieldText = ({ field, id, label }) => (
  <Form.Group className="mb-2">
    <Form.Label htmlFor={id} srOnly>
      {label}
    </Form.Label>
    <Form.Control type="text" size="lg" id={id} placeholder={label} {...field} />
  </Form.Group>
)

export default FormFieldText
