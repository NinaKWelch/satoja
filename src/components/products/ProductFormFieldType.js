import Form from "react-bootstrap/Form"

const ProductFormFieldType = ({ field, id, label, items, setFieldValue }) => (
  <Form.Group className="mb-2">
    <div className="text-center">
      <Form.Label htmlFor={id}>{label}</Form.Label>
    </div>
    <Form.Control
      as="select"
      size="lg"
      id={id}
      custom
      onChange={(e) => setFieldValue(field.name, e.target.value)}
      {...field}
    >
      {items.map((item, index) => (
        <option key={index} value={item.value}>
          {item.type}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
)

export default ProductFormFieldType
