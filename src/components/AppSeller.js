import { Redirect } from "react-router-dom"
import NavigationBarSeller from "./navigation/NavigationBarSeller"
import RoutesSeller from "./navigation/RoutesSeller"

const AppSeller = ({ user, logOut, setSellerView }) => (
  <>
    <NavigationBarSeller setSellerView={setSellerView} />
    <RoutesSeller user={user} logOut={logOut} setSellerView={setSellerView} />
    <Redirect to="/home" />
  </>
)
export default AppSeller
