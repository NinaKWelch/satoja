import { Formik, Form } from "formik"
import * as Yup from "yup"
import {
  isSelectedEvents,
  calcVat,
  roundDecimals,
  updateDefautImages,
  setDefaultProductImage,
} from "../../helpers/productFormHelper"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import UpdateProductFormFields from "./UpdateProductFormFields"

const UpdateProductsSchema = Yup.object().shape({
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
          .required("Varastomäärä edellytetään")
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
      .lessThan(999, "Voi olla enintään 999"),
  }),
  close_before_event: Yup.number(),
  events: Yup.array().of(
    Yup.object().shape({
      event_id: Yup.number(),
      selected: Yup.boolean(),
      reserved: Yup.number(),
    })
  ),
})

const UpdateProductForm = ({ product, events, eventSelection, handleUpdateProduct }) => {
  // assign initial values for sizes
  const setProductSizes = (arr) => {
    const productSizes = []

    if (product.type === "kg" || product.type === "l") {
      arr.forEach((obj) => {
        // if all items of particular weight/volume has been reserved
        // do not include it in the array
        //if (obj.quantity >= obj.reserved_quantity) {
        productSizes.push({
          multiple: true,
          unit: obj.unit,
          quantity: obj.quantity,
          reserved_quantity: obj.reserved_quantity,
        })
        //}
      })
    }
    //console.log("productsizes: ", productSizes)
    return productSizes
  }

  // assign initial value for vat
  const setVat = (num) => {
    switch (num) {
      case 0:
        return "Ei alv."
      case 24:
        return "24%"
      default:
        return "14%"
    }
  }

  // ensure all selected events are included
  // while submitting the changes
  const updateEventSelection = (arr) => {
    let updatedEventSelection = []

    arr.forEach((obj) => {
      const isDuplicate = product.events.includes(obj.event_id)

      // remove events that have been deselected
      // but keep previously selected events which
      // are not included in the current event selection
      if (obj.selected === false && isDuplicate) {
        const i = product.events.indexOf(obj.event_id)
        product.events.splice(i, 1)
      }

      // add newly selected events
      if (obj.selected === true && !isDuplicate) {
        updatedEventSelection.push(obj.event_id)
      }

      return
    })

    // return a combined and sorted array of events
    return product.events.concat(updatedEventSelection).sort((a, b) => a - b)
  }

  return (
    <Formik
      initialValues={{
        category: product.category,
        image_url: product.image_url,
        title: product.name,
        description: product.description,
        organic: product.organic,
        type: product.type,
        vat: setVat(product.vat),
        unit_price: Number(product.unit_price),
        sizes: setProductSizes(product.sizes),
        unit_quantity:
          product.type !== "kg" || product.type !== "l"
            ? Number(product.sizes[0].quantity)
            : 0,
        close_before_event: product.close_before_event,
        events: eventSelection,
      }}
      enableReinitialize={true}
      validationSchema={UpdateProductsSchema}
      onSubmit={(values, { resetForm }) => {
        // set sizes by product type
        const sortSizesByType = (type) => {
          const sizes = []

          if (type === "kpl" || type === "motti" || type === "pkt" || type === "cube") {
            const oneSize = {
              unit: 1,
              price: roundDecimals(values.unit_price),
              quantity: Number(values.unit_quantity),
              // TODO: if the initial product type has been changed from "kg" or "l"
              // to one of the single unit sizes
              // what quantity and reserved quantity should be shown?
              reserved_quantity: product.sizes[0].reserved_quantity,
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
                reserved_quantity: size.reserved_quantity ? size.reserved_quantity : 0,
              }
              //console.log("SIZEOPTION: ", sizeOption)
              sizes.push(sizeOption)
            })
          }
          return sizes
        }

        // updated product object
        const updatedProduct = {
          category: values.category,
          image_url: values.image_url
            ? updateDefautImages(values.category, values.image_url)
            : setDefaultProductImage(values.category),
          name: values.title,
          description: values.description,
          organic: values.organic,
          type: values.type,
          vat: calcVat(values.vat),
          unit_price: roundDecimals(values.unit_price),
          sellers_id: product.sellers_id,
          close_before_event: values.close_before_event,
        }

        handleUpdateProduct(
          updatedProduct,
          updateEventSelection(values.events),
          sortSizesByType(values.type)
        )
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
              <UpdateProductFormFields
                product={product}
                events={events}
                values={values}
                productType={product.type}
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
                  Tallenna muutokset
                </Button>
              </Col>
            </Row>
          </Form>
        )
      }}
    </Formik>
  )
}

export default UpdateProductForm
