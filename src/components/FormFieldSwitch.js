import Form from "react-bootstrap/Form"

const FormFieldSwitch = ({ field, id, label }) => (
  <Form.Check
    type="switch"
    id={id}
    area-label={label}
    checked={field.value === true}
    {...field}
  />
)

export default FormFieldSwitch
