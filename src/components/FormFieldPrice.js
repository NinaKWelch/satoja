import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

const FormFieldPrice = ({ field, id, label, disabled, setFieldValue }) => {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

  // check that input value is a valid number
  const isNumeric = (str) => typeof str === "string" && str.trim() !== "" && !isNaN(str)
  // check that input value contains only spaces, numbers, commas, periods or minus/plus
  const containsOnlyAllowedCharacters = (str) => /^[0-9,.-\\+\s]*$/.test(str)

  // change input value
  const handleSetFieldValue = (value) => {
    setError(false)
    setFieldValue(field.name, value)
  }

  // display error message
  const errorMessage = (message) => {
    setError(true)
    setMessage(message)

    // show the error message for 5 sec
    setTimeout(() => {
      setError(false)
      setMessage("")
    }, 5000)
  }

  const handleInput = (value) => {
    // ensure number does not include spaces
    const valueWithoutSpaces = value.replace(/\s/g, "")
    // ensure all leading zeros are removed excluding one before a period
    const valueWithoutRedundantZeros = valueWithoutSpaces.replace(/^0+(?=\d)/, "")

    if (valueWithoutSpaces === "." || valueWithoutSpaces === ",") {
      // check if only a period or comma has been entered
      handleSetFieldValue("0.")
    } else if (isNumeric(value) || value === "") {
      // check that value is a valid number or an empty string
      handleSetFieldValue(valueWithoutRedundantZeros)
    } else if (!isNumeric(value)) {
      // if value is not a valid number
      // check that only allowed characters have been used
      if (containsOnlyAllowedCharacters(value)) {
        if (!value.includes(".") && value.includes(",", 1)) {
          // if there are no periods and only one comma,
          // replace comma with period
          const valueWithoutComma = value.replace(",", ".")

          // check that resulting string is a valid number
          isNumeric(valueWithoutComma)
            ? handleSetFieldValue(valueWithoutComma)
            : errorMessage("Voi olla vain numero")
        } else if (
          (value.includes(",") && value.includes(".")) ||
          value.includes(".", 2)
        ) {
          // check if value includes both commas and periods
          // or period has been used more than once
          errorMessage("Erota vain sentit pilkulla tai pisteellä")
        }
      } else {
        errorMessage("Voi olla vain numero")
      }
    }
  }

  return (
    <Form.Group className="mb-2">
      <div className="text-center">
        <Form.Label htmlFor={id}>{label}</Form.Label>
      </div>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>€</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="text"
          inputMode="decimal"
          onWheel={(e) => e.target.blur()}
          placeholder="0.00"
          id={id}
          {...field}
          onChange={(e) => handleInput(e.target.value)}
          disabled={disabled}
          size="lg"
          style={{ textAlign: "right" }}
        />
      </InputGroup>
      {error === true && (
        <small id={id} className="form-text text-danger">
          {message}
        </small>
      )}
    </Form.Group>
  )
}

export default FormFieldPrice
