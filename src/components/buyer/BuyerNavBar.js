import { useSelector } from "react-redux"
import { ReactComponent as HomeIcon } from "../../media/main-navigation/home_icon.svg"
import { ReactComponent as MapIcon } from "../../media/main-navigation/buyer/buyer_map.svg"
import { ReactComponent as CartIcon } from "../../media/main-navigation/buyer/buyer_cart.svg"
import { ReactComponent as OrdersIcon } from "../../media/main-navigation/buyer/buyer_orders.svg"
import { ReactComponent as ProfileIcon } from "../../media/main-navigation/buyer/buyer_profile.svg"
import Navbar from "react-bootstrap/Navbar"
import NavigationLink from "../NavigationLink"

const BuyerNavBar = ({ signedUser }) => {
  const cart = useSelector((state) => state.shoppingCart)

  // calculate the number of items in the cart
  const calcItemsInCart = (arr) => {
    let allItems = 0

    arr.forEach((item) => {
      allItems += item.batches.reduce((a, b) => a + b.order_quantity, 0)
    })

    return allItems
  }

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
      <NavigationLink id="events" url="/map">
        <MapIcon />
        <span>Kartta</span>
      </NavigationLink>
      <NavigationLink id="cart" url="/cart">
        <CartIcon />
        <span>Ostoskori</span>
        {cart && calcItemsInCart(cart) > 0 && (
          <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger py-1 px-2">
            {calcItemsInCart(cart)}
            <span className="visually-hidden">tavaraa ostoskorissa</span>
          </span>
        )}
      </NavigationLink>
      {signedUser && (
        <>
          <NavigationLink id="orders" url="/orders/buyer">
            <OrdersIcon />
            <span>Noudot</span>
          </NavigationLink>
          <NavigationLink id="profile" url="/profile/buyer">
            <ProfileIcon />
            <span>Profiili</span>
          </NavigationLink>
        </>
      )}
    </Navbar>
  )
}

export default BuyerNavBar
