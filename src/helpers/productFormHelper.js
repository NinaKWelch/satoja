// Product Form Helpers

/**
SELECT INPUTS
*/

// category selection
export const productCategories = [
  "Vihannekset",
  "Liha & kala",
  "Munat",
  "Hedelmät & marjat",
  "Maitotuotteet",
  "Leivät & leivonta",
  "Yrtit & mausteet",
  "Ruokaa",
  "Juomat",
  "Muut",
]

// type selection
export const productTypes = [
  { type: "Kpl", value: "kpl" },
  { type: "Kg", value: "kg" },
  { type: "Litra", value: "l" },
  { type: "Paketti", value: "pkt" },
  { type: "Motti", value: "motti" },
  { type: "Kuutio", value: "cube" },
]

// alv selection
export const productAlv = ["14%", "24%", "Ei alv."]

/**
INPUT LABELS
*/

// input label for price
export const choosePriceLabel = (unit) => {
  switch (unit) {
    case "kpl":
      return "Aseta kappalehinta (sis alv)*"
    case "kg":
      return "Aseta kilohinta (sis alv)*"
    case "l":
      return "Aseta litrahinta (sis alv)*"
    case "pkt":
      return "Aseta pakettihinta (sis alv)*"
    case "cube":
      return "Aseta kuutiohinta (sis alv)*"
    default:
      return `Aseta ${unit.toLowerCase()}hinta (sis alv)*`
  }
}

// input label for size
export const chooseSizeLabel = (unit) => {
  switch (unit) {
    case "kg":
      return `Paino* (${unit})`
    default:
      return `Tilavuus* (${unit})`
  }
}

/**
 IMAGES
*/

const defaultImages = [
  "general/vihannekset_2x_o482nl",
  "general/liha-kala_2x_ja6fny",
  "general/munat_2x_zo3xnq",
  "general/hedelmat-marjat_2x_zfyftv",
  "general/maitotuotteet_zfrkwu",
  "general/leivat-leivonta_2x_ozueux",
  "general/yrtit-mausteet_yvekbb",
  "general/ruokaa_2x_nzvn3e",
  "general/juomat2x_hkkudb",
  "general/muut_2x_cxusjk",
]

// set default product image
// when image link is broken
export const setDefaultProductImage = (category) => {
  switch (category) {
    case "Vihannekset":
      return "general/vihannekset_2x_o482nl"
    case "Liha & kala":
      return "general/liha-kala_2x_ja6fny"
    case "Munat":
      return "general/munat_2x_zo3xnq"
    case "Hedelmät & marjat":
      return "general/hedelmat-marjat_2x_zfyftv"
    case "Maitotuotteet":
      return "general/maitotuotteet_zfrkwu"
    case "Leivät & leivonta":
      return "general/leivat-leivonta_2x_ozueux"
    case "Yrtit & mausteet":
      return "general/yrtit-mausteet_yvekbb"
    case "Ruokaa":
      return "general/ruokaa_2x_nzvn3e"
    case "Juomat":
      return "general/juomat2x_hkkudb"
    default:
      return "general/muut_2x_cxusjk"
  }
}

// if product users a default image
// check that it corresponds to the category selected
// if category has changed, change the image also
// else return the current image
export const updateDefautImages = (category, image) => {
  if (defaultImages.includes(image)) {
    return setDefaultProductImage(category)
  } else {
    return image
  }
}

/**
GENERAL
*/

export const calculateUnitPrice = (price, size) => {
  const total = price * size

  // do not calculate unit price if price or size is over the limit
  if (price > 999 || size > 999) {
    return "0.00"
  }

  return total.toFixed(2)
}

// check that at least one event has been selceted
export const isSelectedEvents = (arr) => {
  const selectedEvents = arr.filter((obj) => obj.selected === true)
  if (selectedEvents.length > 0) {
    return true
  } else {
    return false
  }
}

/**
SUBMIT FORM
*/

// set vat
export const calcVat = (str) => {
  switch (str) {
    case "Ei alv.":
      return 0
    case "24%":
      return 24
    default:
      return 14
  }
}

// calculate total number of products
export const calcQuantity = (arr) => {
  const quantity = arr.reduce((a, b) => a + Number(b.quantity), 0)
  return quantity
}

// round the number to two decimals
export const roundDecimals = (num) => Number(Math.round(num + "e+2") + "e-2")
