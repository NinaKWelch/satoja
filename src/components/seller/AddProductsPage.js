import TemplatePage from "../TemplatePage"
import AddProducts from "../products/AddProducts"

const AddProductsPage = ({ user }) => (
  <TemplatePage pageHeader="Uusi ilmoitus" pageColor="bg-basic">
    {user && <AddProducts user={user} />}
  </TemplatePage>
)

export default AddProductsPage
