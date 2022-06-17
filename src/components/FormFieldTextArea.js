import Form from "react-bootstrap/Form"

const FormFieldTextArea = ({ field, id, label, rows }) => (
  <Form.Group className="mb-2">
    <Form.Label htmlFor={id} srOnly>
      {label}
    </Form.Label>
    <Form.Control
      as="textarea"
      rows={rows}
      size="lg"
      id={id}
      placeholder={label}
      {...field}
    />
  </Form.Group>
)

export default FormFieldTextArea
