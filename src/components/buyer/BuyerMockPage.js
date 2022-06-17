import TemplatePage from "../TemplatePage"
import LoginPage from "../home/LoginPage"

const BuyerMockPage = ({ page, bgColor }) => {
  const handlePageContent = (name) => {
    switch (name) {
      case "orders":
        return "Noudot"
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

export default BuyerMockPage
