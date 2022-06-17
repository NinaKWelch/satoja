import { Formik, Form } from "formik"
import * as Yup from "yup"
import { calcVat, isSelectedEvents, roundDecimals } from "../../helpers/productFormHelper"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import ProductFormFields from "./ProductFormFields"

// Yup
const AddProductsSchema = Yup.object().shape({
  category: Yup.string(),
  image_url: Yup.string(),
  title: Yup.string()
    .min(2, "Minimimipituus on 2 merkkiä")
    .max(50, "Maksimipituus on 50 merkkiä")
    .required("Otsikko edellytetään"),
  description: Yup.string()
    .min(5, "Minimimipituus on 5 merkkiä")
    .max(1200, "Maksimipituus on 1000 merkkiä")
    .required("Tuotekuvaus edellytetään"),
  organic: Yup.boolean(),
  type: Yup.string(),
  vat: Yup.string(),
  unit_price: Yup.number()
    .positive("Hinta ei voi olla nolla tai negatiivinen")
    .lessThan(999, "Hinta ylitti enimmäismäärän")
    .required("Hinta edellytetään"),
  sizes: Yup.array().of(
    Yup.object().shape({
      multiple: Yup.boolean(),
      unit: Yup.number().when("multiple", {
        is: true,
        then: Yup.number()
          .required("Paino tai tilavuus edellytetään")
          .positive("Painon tai tilavuuden oltava nollaa suurempi")
          .lessThan(999, "Paino tai tilavuus ylitti enimmäismäärän")
          .test("max-decimals", "Voit lisätä maksimissaan 3 desimaalia", (value) =>
            /^\d+(\.\d{0,3})?$/.test(value)
          ),
      }),
      quantity: Yup.number().when("multiple", {
        is: true,
        then: Yup.number()
          .required("Varastoarvo edellytetään")
          //.positive("Varastoarvo täytyy olla nollaa suurempi")
          .lessThan(999, "Varasto ylitti enimmäismäärän"),
      }),
    })
  ),
  unit_quantity: Yup.number().when("type", {
    is: (value) =>
      value === "kpl" || value === "motti" || value === "pkt" || value === "cube",
    then: Yup.number()
      .required("Varastoarvo edellytetään")
      //.positive("Voi olla vähintään yksi")
      .lessThan(999, "Varasto ylitti enimmäismäärän"),
  }),
  close_before_event: Yup.number(),
  events: Yup.array().of(
    Yup.object().shape({
      event_id: Yup.number(),
      selected: Yup.boolean(),
    })
  ),
})

const ProductForm = ({
  user,
  events,
  eventSelection,
  handleAddNewProduct,
  handleSuccess,
}) => (
  <Formik
    initialValues={{
      category: "Vihannekset",
      image_url: "",
      title: "",
      description: "",
      organic: false,
      type: "kpl",
      vat: "14%",
      unit_price: "",
      sizes: [
        {
          multiple: false,
          unit: "",
          quantity: 1,
          /*reserved_quantity: 0,*/
        },
      ],
      unit_quantity: 1,
      close_before_event: 24,
      events: eventSelection,
    }}
    enableReinitialize={true}
    validationSchema={AddProductsSchema}
    onSubmit={async (values, { resetForm }) => {
      // new product object
      const product = {
        category: values.category,
        image_url: values.image_url,
        name: values.title,
        description: values.description,
        organic: values.organic,
        type: values.type,
        vat: calcVat(values.vat),
        unit_price: roundDecimals(values.unit_price),
        sellers_id: Number(user.id),
        close_before_event: values.close_before_event,
      }

      // set sizes by product type
      const sortSizesByType = (type) => {
        const sizes = []

        if (type === "kpl" || type === "motti" || type === "pkt" || type === "cube") {
          const oneSize = {
            unit: 1,
            price: roundDecimals(values.unit_price),
            quantity: Number(values.unit_quantity),
            reserved_quantity: 0,
          }
          sizes.push(oneSize)
        } else {
          values.sizes.forEach((size) => {
            const sizeOption = {
              unit: parseFloat(parseFloat(size.unit).toFixed(3)),
              price: parseFloat(
                (parseFloat(values.unit_price) * parseFloat(size.unit)).toFixed(2)
              ),
              quantity: Number(size.quantity),
              reserved_quantity: 0,
            }
            sizes.push(sizeOption)
          })
        }

        return sizes
      }

      // submit new product
      const status = await handleAddNewProduct(
        product,
        values.events,
        sortSizesByType(values.type)
      )

      if (status === 200) {
        handleSuccess()
        resetForm()
      }
    }}
  >
    {({ values, setFieldValue, isValid, isSubmitting, isValidating, submitCount }) => {
      // is user tries to submit an incomplete form
      // scroll to top and prompt user to check the form
      isSubmitting && !isValidating && setTimeout(() => window.scroll(0, 0), 500)

      return (
        <Form>
          <Row>
            {!isValid && !isSubmitting && submitCount > 0 && (
              <div className="mb-3 text-center">
                <span className="text-danger">Puuttuvaa tietoa. Tarkista lomake.</span>
              </div>
            )}
            <ProductFormFields
              events={events}
              values={values}
              setFieldValue={setFieldValue}
            />
            <Col xs={12}>
              {isSelectedEvents(values.events) === false && events.length > 0 && (
                <div className="mb-3 text-center">
                  <span className="text-danger">
                    Muista valita ainakin yksi myyntipiste
                  </span>
                </div>
              )}
              <Button
                type="submit"
                variant="success"
                size="lg"
                className="w-100"
                disabled={isSelectedEvents(values.events) === false}
              >
                Julkaise
              </Button>
            </Col>
          </Row>
        </Form>
      )
    }}
  </Formik>
)

export default ProductForm
