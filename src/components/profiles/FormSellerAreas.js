import { Field } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"
//changes from reko_areas to regions - 02.05.2022 ReinoP
const FormSellerAreas = ({ values }) => (
  <Col xs={{ span: 10, offset: 1 }} className="mb-3">
    <div className="text-center">
      <h5 className="mb-4">Valitse maakunnat, joissa myyt tuotteita</h5>
    </div>
    {values.regions &&
      values.regions.map((region, index) => (
        <div key={index}>
          <Field
            name={`regions.${index}.belongs`}
            value={region.belongs}
            id={region.id}
            label={region.region}
            component={FormFieldCheckbox}
          />
        </div>
      ))}
  </Col>
)

export default FormSellerAreas
