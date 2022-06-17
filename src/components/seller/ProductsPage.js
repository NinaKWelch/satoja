import TemplatePage from "../TemplatePage"
import Products from "../Products"

const ProductsPage = ({ user }) => (
  <TemplatePage pageHeader="Tuotteet" pageColor="bg-basic">
    {user && <Products user={user} />}
  </TemplatePage>
)

export default ProductsPage
