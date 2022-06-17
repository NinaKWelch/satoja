import Form from "react-bootstrap/Form"

const FormFieldCheckboxInline = ({ field, id, label }) => (
  <Form.Check inline className="mr-0 pr-1">
    <Form.Check.Input type="checkbox" id={id} {...field} checked={field.value === true} />
    <Form.Check.Label htmlFor={id}>{label}</Form.Check.Label>
  </Form.Check>
)

export default FormFieldCheckboxInline
