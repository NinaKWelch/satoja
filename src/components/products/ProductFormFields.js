import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Field, ErrorMessage } from "formik"
import {
  productCategories,
  productTypes,
  productAlv,
  choosePriceLabel,
  chooseSizeLabel,
  calculateUnitPrice,
} from "../../helpers/productFormHelper"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FormErrorMessage from "../FormErrorMessage"
import FormFieldSelect from "../FormFieldSelect"
import FormFieldPrice from "../FormFieldPrice"
import FormFieldRange from "../FormFieldRange"
import ProductFormFieldsGeneral from "./ProductFormFieldsGeneral"
import ProductFormFieldType from "./ProductFormFieldType"
import ProductFormFieldsUnitsByWeight from "./ProductFormFieldsUnitsByWeight"
import ProductFormFieldsUnitsByPiece from "./ProductFormFieldsUnitsByPiece"
import ProductFormFieldsEventList from "./ProductFormFieldsEventList"

const ProductFormFields = ({ events, values, setFieldValue }) => {
  const [inputId, setInputId] = useState("")
  const [message, setMessage] = useState("")

  // display error message for number inputs
  const errorMessage = (id, message) => {
    setInputId(id)
    setMessage(message)

    // show the error message for 5 sec
    setTimeout(() => {
      setInputId("")
      setMessage("")
    }, 5000)
  }

  // enable form validation for sizes array
  if (values.type === "kg" || values.type === "l") {
    values.sizes.forEach((size) => (size.multiple = true))
  } else {
    values.sizes.forEach((size) => (size.multiple = false))
  }

  return (
    <Col xs={12}>
      <ProductFormFieldsGeneral
        values={values}
        setFieldValue={setFieldValue}
        productCategories={productCategories}
      />
      <Row className="mb-3">
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 6, offset: 3 }}
          md={{ span: 8, offset: 2 }}
        >
          <Field
            name="type"
            id="product-type"
            items={productTypes}
            label="Valitse yksikkö*"
            setFieldValue={setFieldValue}
            component={ProductFormFieldType}
          />
        </Col>
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 6, offset: 3 }}
          md={{ span: 8, offset: 2 }}
        >
          <Field
            name="vat"
            id="product-vat"
            items={productAlv}
            label="Valitse alv %*"
            setFieldValue={setFieldValue}
            component={FormFieldSelect}
          />
        </Col>
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 6, offset: 3 }}
          md={{ span: 8, offset: 2 }}
        >
          <Field
            name="unit_price"
            id="product-price"
            label={choosePriceLabel(values.type)}
            setFieldValue={setFieldValue}
            component={FormFieldPrice}
          />
          <ErrorMessage name="unit_price" component={FormErrorMessage} />
        </Col>
        {(values.type === "kpl" ||
          values.type === "motti" ||
          values.type === "pkt" ||
          values.type === "cube") && (
          <ProductFormFieldsUnitsByPiece
            message={message}
            inputId={inputId}
            handleErrorMessage={errorMessage}
            setFieldValue={setFieldValue}
          />
        )}
      </Row>
      {(values.type === "kg" || values.type === "l") && (
        <ProductFormFieldsUnitsByWeight
          values={values}
          message={message}
          inputId={inputId}
          handleErrorMessage={errorMessage}
          handleChooseSizeLabel={chooseSizeLabel}
          handleCalculateUnitPrice={calculateUnitPrice}
          setFieldValue={setFieldValue}
        />
      )}
      <Row className="mb-3">
        <Col>
          <Field
            name="close_before_event"
            id="product-time-range"
            label="Aseta sulkeutumisajankohta"
            helperText={`Tilaus sulkeutuu ${values.close_before_event} tuntia ennen tilaisuuden alkua`}
            component={FormFieldRange}
          />
        </Col>
      </Row>
      {events.length > 0 ? (
        <ProductFormFieldsEventList events={events} values={values} />
      ) : (
        <Row className="mb-3">
          <Col>
            <p>
              Et ole lisännyt itseäsi tuottajana yhteenkään Reko-ryhmään tai
              valitsemallasi ryhmällä ei ole tulevia tapahtumia.
            </p>
            <p>
              Voit päivittää tietoja <Link to="/profile/seller">profiili-sivulla</Link>.
              Valitettavasti joudut tämän jälkeen aloittamaan ilmoituksen luonnin alusta.
            </p>
          </Col>
        </Row>
      )}
    </Col>
  )
}

export default ProductFormFields
