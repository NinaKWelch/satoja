import Form from "react-bootstrap/Form"

const FormFieldNumber = ({
  field,
  id,
  label,
  decimals,
  handleErrorMessage,
  disabled,
  setFieldValue,
}) => {
  // check that input value is a valid number
  const isNumeric = (str) => typeof str === "string" && str.trim() !== "" && !isNaN(str)
  // check that input value contains only spaces, numbers, commas, periods or minus/plus
  const containsOnlyAllowedCharacters = (str) => /^[0-9,.-\\+\s]*$/.test(str)

  // remove decimals if value must be a whole number
  const removeDecimals = (str) => Number(str).toFixed(0)

  // change input value
  const handleSetFieldValue = (value) => {
    handleErrorMessage(id, "")
    setFieldValue(field.name, value)
  }

  const handleInput = (value) => {
    // ensure number does not include spaces or minus/plus
    const valueWithoutSpaces = value.replace(/[-\\+\s]/g, "")
    // ensure all leading zeros are removed excluding one before a period
    const valueWithoutRedundantZeros = valueWithoutSpaces.replace(/^0+(?=\d)/, "")

    if (valueWithoutSpaces === "." || valueWithoutSpaces === ",") {
      // check if only a period or comma has been entered
      decimals === false ? handleSetFieldValue("") : handleSetFieldValue("0.")
    } else if (isNumeric(value) || value === "") {
      // check that value is a valid number or an empty string
      // remove decimals, if only whole numbers are allowed
      decimals === false
        ? handleSetFieldValue(removeDecimals(valueWithoutSpaces))
        : handleSetFieldValue(valueWithoutRedundantZeros)
    } else if (!isNumeric(value)) {
      // if value is not a valid number
      // check that only allowed characters have been used
      if (containsOnlyAllowedCharacters(value)) {
        if (decimals === false && value.includes(",")) {
          // remove comma, if only whole numbers are allowed
          value.replace(",", "")
        } else if (!value.includes(".") && value.includes(",", 1)) {
          // if there are no periods and only one comma,
          // replace comma with period
          const valueWithoutComma = value.replace(",", ".")

          // check that resulting string is a valid number
          isNumeric(valueWithoutComma)
            ? handleSetFieldValue(valueWithoutComma)
            : handleErrorMessage(id, "Voi olla vain numero")
        } else if (
          (value.includes(",") && value.includes(".")) ||
          value.includes(".", 2)
        ) {
          // check if value includes both commas and periods
          // or period has been used more than once
          handleErrorMessage(id, "Erota vain desimaalit pilkulla tai pisteellä")
        }
      } else {
        handleErrorMessage(id, "Voi olla vain numero")
      }
    }
  }

  return (
    <Form.Group className="mb-2">
      <div className="text-center">
        <Form.Label htmlFor={id} srOnly={label === false}>
          {label}
        </Form.Label>
      </div>
      <Form.Control
        type="text"
        inputMode="decimal"
        onWheel={(e) => e.target.blur()}
        placeholder="0"
        id={id}
        {...field}
        onChange={(e) => handleInput(e.target.value)}
        disabled={disabled}
        size="lg"
        style={{ textAlign: "right" }}
      />
    </Form.Group>
  )
}

export default FormFieldNumber
