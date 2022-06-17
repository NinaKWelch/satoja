import { Field } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormSellerAreas = ({ values }) => (
  <Col xs={{ span: 10, offset: 1 }} className="mb-3">
    <div className="text-center">
      <h5 className="mb-4">Noutotilaisuuksissa hyväksymäsi maksutavat</h5>
    </div>
    {values.payment_options.map((option, index) => (
      <div key={index}>
        <Field
          name={`payment_options.${index}.selected`}
          value={option.selected}
          id={option.id}
          label={option.name}
          component={FormFieldCheckbox}
        />
      </div>
    ))}
  </Col>
)

export default FormSellerAreas
