import Form from "react-bootstrap/Form"

const FormFieldDate = ({ field, id, label }) => (
  <Form.Group className="mb-2">
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Control
      type="datetime-local"
      size="lg"
      id={id}
      placeholder={label}
      {...field}
    />
  </Form.Group>
)

export default FormFieldDate
