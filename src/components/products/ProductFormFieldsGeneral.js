import { Field, ErrorMessage } from "formik"
import FormErrorMessage from "../FormErrorMessage"
import FormFieldSelect from "../FormFieldSelect"
import FormFieldText from "../FormFieldText"
import FormFieldTextArea from "../FormFieldTextArea"
import FormFieldCheckbox from "../FormFieldCheckbox"
import ProductFormFieldsImage from "./ProductFormFieldsImage"

const ProductFormFieldsGeneral = ({ values, setFieldValue, productCategories }) => (
  <>
    <Field
      name="category"
      id="product-category"
      label="Valitse tuotekategoria*"
      items={productCategories}
      setFieldValue={setFieldValue}
      component={FormFieldSelect}
    />
    <ErrorMessage name="category" component={FormErrorMessage} />
    <ProductFormFieldsImage values={values} setFieldValue={setFieldValue} />
    <Field
      name="title"
      id="product-title"
      label="Tuotteen nimi*"
      component={FormFieldText}
    />
    <ErrorMessage name="title" component={FormErrorMessage} />
    <Field
      name="description"
      id="product-description"
      label="Tuotekuvaus*"
      rows="2"
      component={FormFieldTextArea}
    />
    <ErrorMessage name="description" component={FormErrorMessage} />
    <Field
      name="organic"
      id="product-organic"
      label="Tuote on luomua"
      component={FormFieldCheckbox}
    />
  </>
)

export default ProductFormFieldsGeneral
