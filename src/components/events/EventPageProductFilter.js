import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useFormikContext, Formik, Form, Field } from "formik"
import * as Yup from "yup"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FormFieldSelect from "../FormFieldSelect"

// Yup
const FilterSchema = Yup.object().shape({
  sellers: Yup.string(),
  categories: Yup.string(),
})

const AutoSubmitForm = () => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()
  const [filters, setFilters] = useState({
    seller: "Kaikki tuottajat",
    category: "Kaikki tuotekategoriat",
  })

  useEffect(() => {
    if (values.sellers !== "" && values.categories !== "") {
      if (values.sellers !== filters.seller || values.categories !== filters.category) {
        // submit if values are different than filters
        setFilters({ seller: values.sellers, category: values.categories })
        submitForm()
      }
    }
  }, [filters, submitForm, values])

  return null
}

const EventPageProductFilter = ({
  eventProducts,
  setProductsToShow,
  handleQueryUrl,
  querySeller,
  handleSetQuerySeller,
  queryCategory,
  handleSetQueryCategory,
}) => {
  const { search } = useLocation()
  const [sellersWithProducts, setSellersWithProducts] = useState([])
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([])
  const [sellerOptions, setSellerOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])

  // assign name for the seller
  const getSellerName = (product) => {
    if (product.seller_name) {
      return product.seller_name
    } else if (product.seller_firstname && product.seller_lastname) {
      return `${product.seller_firstname} ${product.seller_lastname}`
    } else if (product.seller_firstname || product.seller_lastname) {
      return product.seller_firstname ? product.seller_firstname : product.seller_lastname
    } else {
      // default for missing name
      return "Tuottaja " + product.sellers_id
    }
  }

  useEffect(() => {
    // add new seller to sellers array
    const addSeller = (product) => {
      let seller = { id: "", name: "", products: [], categories: [] }

      // add id, name, product and category
      seller.id = product.sellers_id
      seller.name = getSellerName(product)
      seller.products.push(product)
      seller.categories.push(product.category)

      return seller
    }

    // sort sellers by alpahbetical order
    // and create an array of products
    // they have allocated for the selected event
    const sortSellers = (products) => {
      let sellers = []
      let options = ["Kaikki tuottajat"]

      products.forEach((product) => {
        //const quantity = product.sizes.reduce((a, b) => a + b.quantity, 0)
        const isSeller = sellers.find((seller) => seller.id === product.sellers_id)

        // add product to the sellers product list
        if (isSeller) {
          // check if the product category has been added
          const hasCategory = isSeller.categories.find(
            (category) => category === product.category
          )

          const updatedSeller = {
            ...isSeller,
            products: isSeller.products.push(product),
            categories: !hasCategory
              ? isSeller.categories.push(product.category)
              : isSeller.categories,
          }

          sellers.map((seller) =>
            seller.id !== product.sellers_id ? seller : updatedSeller
          )
        } else {
          // add new seller
          const newSeller = addSeller(product)
          sellers.push(newSeller)
        }
      })

      const sortedSellers = sellers.sort((a, b) => a.name - b.name)
      sortedSellers.forEach((seller) => options.push(seller.name))

      setSellersWithProducts(sortedSellers)
      setSellerOptions(options)
    }

    const addCategory = (product, seller) => {
      let category = { name: "", products: [], sellers: [] }

      // add name, product and seller
      category.name = product.category
      category.products.push(product)
      category.sellers.push(seller)

      return category
    }

    // sort categories by available products
    const sortCategories = (products) => {
      let categories = []
      let options = ["Kaikki tuotekategoriat"]

      products.forEach((product) => {
        const sellerName = getSellerName(product)
        //const quantity = product.sizes.reduce((a, b) => a + b.quantity, 0)
        const isCategory = categories.find(
          (category) => category.name === product.category
        )

        // add product  to the category product list
        if (isCategory) {
          // check if seller has already been added
          const hasSeller = isCategory.sellers.find((seller) => seller === sellerName)

          const updatedCategory = {
            ...isCategory,
            products: isCategory.products.push(product),
            sellers: !hasSeller
              ? isCategory.sellers.push(sellerName)
              : isCategory.sellers,
          }

          categories.map((category) =>
            category.name !== product.category ? category : updatedCategory
          )
        } else {
          // add new category
          const newCategory = addCategory(product, sellerName)
          categories.push(newCategory)
        }
      })

      const sortedCategories = categories.sort((a, b) => a.name - b.name)
      sortedCategories.forEach((category) => options.push(category.name))

      setCategoriesWithProducts(sortedCategories)
      setCategoryOptions(options)
    }

    sortSellers(eventProducts)
    sortCategories(eventProducts)
    eventProducts && setProductsToShow(eventProducts)
  }, [eventProducts, setProductsToShow])

  useEffect(() => {
    let query = new URLSearchParams(search)
    const name = query.get("name")
    const category = query.get("category")

    // handle search queries that are done via url
    const handleInitialQuery = (sellers, categories, name, category) => {
      const sellersWithQuery = sellers.map((seller) => {
        let sellerWord = seller.replace(/[&]/g, "ja").replace(/[^a-zA-Z0-9_-]/g, "")
        return { option: seller, query: sellerWord.toLowerCase() }
      })
      const categoriesWithQuery = categories.map((category) => {
        let categoryWord = category.replace(/[&]/g, "ja").replace(/[^a-zA-Z0-9_-]/g, "")
        return { option: category, query: categoryWord.toLowerCase() }
      })

      // check if search terms have a corresponding seller or category
      const nameQuery = (str) => sellersWithQuery.find((item) => item.query === str)
      const categoryQuery = (str) =>
        categoriesWithQuery.find((item) => item.query === str)

      if (search) {
        if (nameQuery(name) && categoryQuery(category)) {
          // if both name and catergory queries are valid
          // ensure filter options match the queries
          nameQuery(name).option !== querySeller &&
            handleSetQuerySeller(nameQuery(name).option)
          categoryQuery(category).option !== queryCategory &&
            handleSetQueryCategory(categoryQuery(category).option)
        } else if (nameQuery(name)) {
          // if only name is valid, ensure seller filter option matches the query
          // and change the category filter option to all
          nameQuery(name).option !== querySeller &&
            handleSetQuerySeller(nameQuery(name).option)
          handleSetQueryCategory("Kaikki tuotekategoriat")
          // update the url
          handleQueryUrl(nameQuery(name).option, "Kaikki tuotekategoriat")
        } else if (categoryQuery(category)) {
          // if only category is valid, ensure category filter option matches the query
          // and change the seller filter option to all
          categoryQuery(category).option !== queryCategory &&
            handleSetQueryCategory(categoryQuery(category).option)
          handleSetQuerySeller("Kaikki tuottajat")
          // update the url
          handleQueryUrl("Kaikki tuottajat", categoryQuery(category).option)
        } else {
          // if neither name nor category is valid
          // set query parameters to default and update url
          handleSetQuerySeller("Kaikki tuottajat")
          handleSetQueryCategory("Kaikki tuotekategoriat")
          handleQueryUrl("Kaikki tuottajat", "Kaikki tuotekategoriat")
        }
      } else {
        // set initial query parameters when user first navigates to events page
        handleQueryUrl("Kaikki tuottajat", "Kaikki tuotekategoriat")
      }
    }

    // check if search terms or filters have changed
    sellerOptions.length > 0 &&
      categoryOptions.length > 0 &&
      handleInitialQuery(sellerOptions, categoryOptions, name, category)
  }, [
    search,
    sellerOptions,
    categoryOptions,
    querySeller,
    handleSetQuerySeller,
    queryCategory,
    handleSetQueryCategory,
    handleQueryUrl,
  ])

  return (
    <Formik
      initialValues={{
        sellers: querySeller || "",
        categories: queryCategory || "",
      }}
      enableReinitialize={true}
      validationSchema={FilterSchema}
      onSubmit={(values) => {
        if (values.sellers !== "" && values.categories !== "") {
          // the selected seller
          const selectedSeller = sellersWithProducts.find(
            (seller) => seller.name === values.sellers
          )

          // the selected category
          const selectedCategory = categoriesWithProducts.find(
            (category) => category.name === values.categories
          )

          // set new url with search query so it can be shared
          handleQueryUrl(values.sellers, values.categories)

          if (
            values.sellers !== "Kaikki tuottajat" &&
            values.categories !== "Kaikki tuotekategoriat"
          ) {
            // show category options based on seller products
            setCategoryOptions(["Kaikki tuotekategoriat", ...selectedSeller.categories])
            // show seller options based on product category
            setSellerOptions(["Kaikki tuottajat", ...selectedCategory.sellers])

            // show products from the seller based on selected category
            const sellerProductsByCategory = selectedSeller.products.filter(
              (product) => product.category === values.categories
            )

            setProductsToShow(sellerProductsByCategory)
          } else if (
            values.sellers !== "Kaikki tuottajat" &&
            values.categories === "Kaikki tuotekategoriat"
          ) {
            // show category options based on seller products
            setCategoryOptions(["Kaikki tuotekategoriat", ...selectedSeller.categories])

            // show all products form the selected seller
            setProductsToShow(selectedSeller.products)
          } else if (
            values.sellers === "Kaikki tuottajat" &&
            values.categories !== "Kaikki tuotekategoriat"
          ) {
            // show seller options based on product category
            setSellerOptions(["Kaikki tuottajat", ...selectedCategory.sellers])

            // show all products in the selected category
            setProductsToShow(selectedCategory.products)
          } else if (
            values.sellers === "Kaikki tuottajat" &&
            values.categories === "Kaikki tuotekategoriat"
          ) {
            const allSellers = sellersWithProducts.map((seller) => seller.name)
            const allProducts = categoriesWithProducts.map((category) => category.name)
            // show all seller options
            setSellerOptions(["Kaikki tuottajat", ...allSellers])
            // show all category options
            setCategoryOptions(["Kaikki tuotekategoriat", ...allProducts])

            // show all products
            setProductsToShow(eventProducts)
          }
        }
      }}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <Row className="g-0 g-md-2">
              <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 0 }}>
                <Field
                  name="sellers"
                  id="product-sellers"
                  items={sellerOptions.length > 0 ? sellerOptions : ["Kaikki tuottajat"]}
                  setFieldValue={setFieldValue}
                  component={FormFieldSelect}
                />
              </Col>
              <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 0 }}>
                <Field
                  name="categories"
                  id="product-categories"
                  items={
                    categoryOptions.length > 0
                      ? categoryOptions
                      : ["Kaikki tuotekategoriat"]
                  }
                  setFieldValue={setFieldValue}
                  component={FormFieldSelect}
                />
              </Col>
            </Row>
            <AutoSubmitForm />
          </Form>
        )
      }}
    </Formik>
  )
}

export default EventPageProductFilter
