import { Redirect } from "react-router-dom"
import NavigationBarBuyer from "./navigation/NavigationBarBuyer"
import RoutesBuyer from "./navigation/RoutesBuyer"

const AppBuyer = ({ user, logOut, setSellerView }) => (
  <>
    <NavigationBarBuyer setSellerView={setSellerView} />
    <RoutesBuyer user={user} logOut={logOut} setSellerView={setSellerView} />
    <Redirect to="/map" />
  </>
)
export default AppBuyer
