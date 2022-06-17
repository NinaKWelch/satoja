import { FieldArray, Field, ErrorMessage } from "formik"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { ReactComponent as DeleteIcon } from "../../media/x-circle-fill.svg"
import { ReactComponent as AddIcon } from "../../media/plus-circle-fill.svg"
import FormErrorMessage from "../FormErrorMessage"
import FormFieldNumber from "../FormFieldNumber"

const ProductFormFieldsUnitsByWeight = ({
  values,
  message,
  inputId,
  handleErrorMessage,
  handleChooseSizeLabel,
  handleCalculateUnitPrice,
  setFieldValue,
}) => {
  const newItem = {
    multiple: true,
    unit: "",
    quantity: "",
    disabled: false,
  }

  // for cases where user changes type value
  // while updating the product
  if (values.sizes.length === 0) {
    values.sizes.push(newItem)
  }

  // add disabled value to sizes
  if (values.sizes.length === 1) {
    if (values.sizes[0].disabled === true) {
      // cases where user edits a product listing by removing all but one size
      // this ensures no changes are made
      values.sizes = [{ ...values.sizes[0], disabled: true }]
    } else if (values.sizes[0].disabled === false) {
      // this ensures no changes are made if disabled value has already been set
      values.sizes = [{ ...values.sizes[0], disabled: false }]
    } else {
      values.sizes =
        values.sizes[0].unit > 0
          ? [{ ...values.sizes[0], disabled: true }]
          : [{ ...values.sizes[0], disabled: false }]
    }
  }

  if (values.sizes.length > 1) {
    values.sizes = values.sizes.map((size) => {
      if (size.disabled === true || size.disabled === false) {
        return size
      } else {
        return size.unit > 0 ? { ...size, disabled: true } : { ...size, disabled: false }
      }
    })
  }

  return (
    <FieldArray
      name="sizes"
      render={(arrayHelpers) => (
        <Row className="g-0">
          <Col className="text-center">
            <h6 className="fw-normal">{handleChooseSizeLabel(values.type)}</h6>
          </Col>
          <Col xs={3} className="text-center">
            <h6 className="fw-normal">Hinta</h6>
          </Col>
          <Col className="text-center">
            <h6 className="fw-normal">Varasto*</h6>
          </Col>
          <Col xs={2} className="text-center"></Col>
          {values.sizes.map((item, index) => (
            <Col xs={12} key={index}>
              <Row className="g-0 align-items-center">
                <Col className="flex-grow-1">
                  <Field
                    name={`sizes.${index}.unit`}
                    id="product-unit-size"
                    label={false}
                    decimals={true}
                    handleErrorMessage={handleErrorMessage}
                    disabled={item.disabled}
                    setFieldValue={setFieldValue}
                    component={FormFieldNumber}
                  />
                </Col>
                <Col xs={3} className="text-center">
                  <p className="mb-1">
                    {values.unit_price !== "" && item.unit > 0
                      ? "€" + handleCalculateUnitPrice(values.unit_price, item.unit)
                      : "€0.00"}
                  </p>
                </Col>
                <Col className="">
                  <Field
                    name={`sizes.${index}.quantity`}
                    id="product-unit-quantity"
                    label={false}
                    decimals={false}
                    handleErrorMessage={handleErrorMessage}
                    setFieldValue={setFieldValue}
                    component={FormFieldNumber}
                  />
                </Col>
                <Col xs={2} className="text-end">
                  {values.sizes.length > 0 && (
                    <Button
                      variant="link"
                      className="mb-2 border-0 text-danger"
                      onClick={() => arrayHelpers.remove(index)}
                      disabled={values.sizes.length === 1}
                    >
                      <DeleteIcon width="36" />
                    </Button>
                  )}
                </Col>
                <Col xs={12}>
                  <ErrorMessage
                    name={`sizes.${index}.unit`}
                    component={FormErrorMessage}
                  />
                  <ErrorMessage
                    name={`sizes.${index}.quantity`}
                    component={FormErrorMessage}
                  />
                  {message &&
                    (inputId === "product-unit-size" ||
                      inputId === "product-unit-quantity") && (
                      <small id={inputId} className="form-text text-danger">
                        {message}
                      </small>
                    )}
                  {/*item.reserved_quantity > 0 && (
                    <small className="form-text text-warning">
                      {productType ? item.unit + productType : "Tällä"} tuotteella on
                      varauksia, jolloin vain varastoarvo on muutettavissa.
                    </small>
                  )*/}
                </Col>
              </Row>
            </Col>
          ))}
          <Col xs={12}>
            <Row className="g-0 align-items-center">
              <Col xs={10} className="text-end">
                <Button
                  variant="link"
                  size="lg"
                  className="border-0 p-0 text-decoration-none text-primary"
                  onClick={() => arrayHelpers.push(newItem)}
                >
                  Lisää tuoterivi
                </Button>
              </Col>
              <Col xs={2} className="text-end">
                <Button
                  variant="link"
                  className="border-0 text-primary"
                  onClick={() => arrayHelpers.push(newItem)}
                >
                  <AddIcon width="36" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    />
  )
}

export default ProductFormFieldsUnitsByWeight
