import Row from "react-bootstrap/Row"
import { ReactComponent as SignPostSell } from "../../media/main-navigation/sign-post-sell.svg"
import { ReactComponent as SignPostArea } from "../../media/main-navigation/sign-post-area.svg"
import { ReactComponent as SignPostRegister } from "../../media/main-navigation/sign-post-register.svg"
import SectionA from "./SectionA"
import SectionAMobile from "./SectionAMobile"
import SectionB from "./SectionB"
import SectionC from "./SectionC"
import SectionD from "./SectionD"
import SectionE from "./SectionE"
import SectionF from "./SectionF"
import SectionFooter from "./SectionFooter"
import HomePageFooter from "./HomePageFooter"

const HomePageContent = ({ signedUser }) => (
  <>
    <Row as="main" className="justify-content-center">
      <SectionA />
      <SectionAMobile />
      <SectionB />
      <SectionFooter url="/map">
        <SignPostArea />
      </SectionFooter>
      <SectionE />
      <SectionFooter url={signedUser ? "/home" : "/add"}>
        <SignPostSell />
      </SectionFooter>
      <SectionD />
      <SectionFooter url={signedUser ? "/map" : "/register"}>
        <SignPostRegister />
      </SectionFooter>
      <SectionC />
      <SectionFooter url={signedUser ? "/home" : "/add"}>
        <SignPostSell />
      </SectionFooter>
      <SectionF />
    </Row>
    <HomePageFooter />
  </>
)

export default HomePageContent
