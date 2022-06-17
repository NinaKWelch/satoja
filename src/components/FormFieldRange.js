import Form from "react-bootstrap/Form"

const FormFieldRange = ({ field, id, label, helperText }) => {
  return (
    <Form.Group>
      <div className="text-center">
        <Form.Label htmlFor={id} className="fs-4">
          {label}
        </Form.Label>
      </div>
      <Form.Control type="range" id={id} {...field} />
      <Form.Text className="text-center text-muted">{helperText}</Form.Text>
    </Form.Group>
  )
}

export default FormFieldRange
