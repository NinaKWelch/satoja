import TemplatePage from "../TemplatePage"
import LoginPage from "../home/LoginPage"

const SellerMockPage = ({ page, bgColor }) => {
  const handlePageContent = (name) => {
    switch (name) {
      case "home":
        return "Tuottajan kotisivu"
      case "add":
        return "Lisää tuote"
      case "update":
        return "Muokkaa ilmoitusta"
      case "products":
        return "Tuotteet"
      case "orders":
        return "Tilaukset"
      case "profile":
        return "Omat tiedot"
      default:
        return
    }
  }

  return (
    <TemplatePage pageHeader={handlePageContent(page)} pageColor={bgColor}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <LoginPage />
      </div>
    </TemplatePage>
  )
}

export default SellerMockPage
