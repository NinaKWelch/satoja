import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormErrorMessage from "../FormErrorMessage"
import FormFieldNumber from "../FormFieldNumber"

const ProductFormFieldsUnitsByPiece = ({
  message,
  inputId,
  handleErrorMessage,
  setFieldValue,
}) => (
  <Col
    xs={{ span: 10, offset: 1 }}
    sm={{ span: 6, offset: 3 }}
    md={{ span: 8, offset: 2 }}
  >
    <Field
      name="unit_quantity"
      id="product-quantity"
      label="Varastoarvo*"
      decimals={false}
      handleErrorMessage={handleErrorMessage}
      setFieldValue={setFieldValue}
      component={FormFieldNumber}
    />
    <ErrorMessage name="unit_quantity" component={FormErrorMessage} />
    {message && inputId === "product-quantity" && (
      <small id={inputId} className="form-text text-danger">
        {message}
      </small>
    )}
  </Col>
)

export default ProductFormFieldsUnitsByPiece
