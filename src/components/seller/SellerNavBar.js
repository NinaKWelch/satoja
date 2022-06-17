import { ReactComponent as HomeIcon } from "../../media/main-navigation/home_icon.svg"
import { ReactComponent as AddIcon } from "../../media/main-navigation/seller/seller_add.svg"
import { ReactComponent as ProductsIcon } from "../../media/main-navigation/seller/seller_products.svg"
import { ReactComponent as OrdersIcon } from "../../media/main-navigation/seller/seller_orders.svg"
import { ReactComponent as ProfileIcon } from "../../media/main-navigation/seller/seller_info.svg"
import Navbar from "react-bootstrap/Navbar"
import NavigationLink from "../NavigationLink"

const SellerNavBar = ({ signedUser }) => {
  return (
    <Navbar
      className="justify-content-around text-center bottom-nav"
      fixed="bottom"
      bg="light"
    >
      <NavigationLink id="home" url="/">
        <HomeIcon />
        <span>Etusivu</span>
      </NavigationLink>
      <NavigationLink id="add" url="/add">
        <AddIcon />
        <span>Julkaise</span>
      </NavigationLink>
      <NavigationLink id="products" url="/products">
        <ProductsIcon />
        <span>Tuotteet</span>
      </NavigationLink>
      {signedUser && (
        <>
          <NavigationLink id="orders" url="/orders/seller">
            <OrdersIcon />
            <span>Tilaukset</span>
          </NavigationLink>
          <NavigationLink id="profile" url="/profile/seller">
            <ProfileIcon />
            <span>Profiili</span>
          </NavigationLink>
        </>
      )}
    </Navbar>
  )
}

export default SellerNavBar
