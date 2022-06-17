import Form from "react-bootstrap/Form"

const FormFieldEmail = ({ field, id, label, disabled }) => (
  <Form.Group className="mb-2">
    <Form.Label htmlFor={id} srOnly>
      {label}
    </Form.Label>
    <Form.Control
      type="email"
      size="lg"
      id={id}
      placeholder={label}
      {...field}
      disabled={disabled}
    />
  </Form.Group>
)

export default FormFieldEmail
