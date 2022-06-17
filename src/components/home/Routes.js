import { useEffect } from "react"
import { useLocation, Switch, Route } from "react-router-dom"
import BuyerApp from "../buyer/BuyerApp"
import BuyerMockPage from "../buyer/BuyerMockPage"
import ProductPage from "../products/ProductPage"
import CollectionEventPage from "../buyer/CollectionEventPage"
import EventPage from "../events/EventPage"
import EventSellerPage from "../events/EventSellerPage"
import ProfilePageBuyer from "../profiles/ProfilePageBuyer"
import CollectionPage from "../buyer/CollectionPage"
import ShoppingCartPage from "../buyer/ShoppingCartPage"
import DiscoveryPage from "../buyer/DiscoveryPage"
import SellerApp from "../seller/SellerApp"
import SellerMockPage from "../seller/SellerMockPage"
import UpdateProducts from "../products/UpdateProducts"
import ContactPage from "../ContactPage"
import ProfilePageSeller from "../profiles/ProfilePageSeller"
import SellerOrdersEventPage from "../seller/SellerOrdersEventPage"
import SellerOrdersPage from "../seller/SellerOrdersPage"
import ProductsPage from "../seller/ProductsPage"
import AddProductsPage from "../seller/AddProductsPage"
import SellerHomePage from "../seller/SellerHomePage"
import AdminPage from "../AdminPage"
import PasswordPageNew from "./PasswordPageNew"
import PasswordPageForgot from "./PasswordPageForgot"
import HomePage from "./HomePage"
import HomePageContent from "./HomePageContent"
import DefaultPage from "./DefaultPage"
import SignUpRedirect from "./SignUpRedirect"
import WelcomePage from "./WelcomePage"
import UnknownPage from "./UnknownPage"

import ReactGA from "react-ga"
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_CODE)

const Routes = ({ user, signedUser }) => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [location])

  return (
    <Switch>
      <Route exact path="/events/:eventID/products/:productID">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <ProductPage />
            )
          ) : (
            <ProductPage />
          )}
        </BuyerApp>
      </Route>
      <Route exact path="/orders/buyer/:eventID">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <BuyerMockPage page="orders" bgColor="bg-basic" />
            )
          ) : (
            <CollectionEventPage user={user} />
          )}
        </BuyerApp>
      </Route>
      <Route /*exact*/ path="/events/:eventID">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <EventPage />
            )
          ) : (
            <EventPage />
          )}
        </BuyerApp>
      </Route>
      <Route exact path="/sellers/:sellerID">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <EventSellerPage />
            )
          ) : (
            <EventSellerPage />
          )}
        </BuyerApp>
      </Route>
      <Route exact path="/profile/buyer">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <BuyerMockPage page="profile" bgColor="bg-basics" />
            )
          ) : (
            <ProfilePageBuyer />
          )}
        </BuyerApp>
      </Route>
      <Route exact path="/orders/buyer">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <BuyerMockPage page="orders" bgColor="bg-basic" />
            )
          ) : (
            <CollectionPage user={user} />
          )}
        </BuyerApp>
      </Route>
      <Route exact path="/cart">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <ShoppingCartPage user={user} signedUser={signedUser} />
            )
          ) : (
            <ShoppingCartPage user={user} signedUser={signedUser} />
          )}
        </BuyerApp>
      </Route>
      <Route exact path="/events">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <DiscoveryPage />
            )
          ) : (
            <DiscoveryPage />
          )}
        </BuyerApp>
      </Route>
      <Route exact path="/map">
        <BuyerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <DiscoveryPage />
            )
          ) : (
            <DiscoveryPage />
          )}
        </BuyerApp>
      </Route>
      {/* SELLER APP ROUTES */}
      <Route
        path="/update/:productID"
        exact={true}
        render={(props) => {
          return (
            <SellerApp>
              {signedUser ? (
                <UpdateProducts {...props} />
              ) : (
                <SellerMockPage page="update" bgColor="bg-basic" />
              )}
            </SellerApp>
          )
        }}
      />
      <Route exact path="/orders/seller/:eventID">
        <SellerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <SellerMockPage page="orders" bgColor="bg-basic" />
            )
          ) : (
            <SellerOrdersEventPage user={user} />
          )}
        </SellerApp>
      </Route>
      <Route exact path="/orders/seller">
        <SellerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <SellerMockPage page="orders" bgColor="bg-basic" />
            )
          ) : (
            <SellerOrdersPage user={user} />
          )}
        </SellerApp>
      </Route>
      <Route exact path="/contact">
        <SellerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <ContactPage />
            )
          ) : (
            <ContactPage />
          )}
        </SellerApp>
      </Route>
      <Route exact path="/profile/seller">
        <SellerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <SellerMockPage page="home" bgColor="bg-basic" />
            )
          ) : (
            <ProfilePageSeller />
          )}
        </SellerApp>
      </Route>
      <Route exact path="/products">
        <SellerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <SellerMockPage page="home" bgColor="bg-basic" />
            )
          ) : (
            <ProductsPage user={user} />
          )}
        </SellerApp>
      </Route>
      <Route exact path="/add">
        <SellerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <SellerMockPage page="home" bgColor="bg-basic" />
            )
          ) : (
            <AddProductsPage user={user} />
          )}
        </SellerApp>
      </Route>
      <Route exact path="/home">
        <SellerApp>
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <SellerMockPage page="home" bgColor="bg-basic" />
            )
          ) : (
            <SellerHomePage user={user} />
          )}
        </SellerApp>
      </Route>
      {/* ADMIN ROUTES */}
      {signedUser && user && user.is_admin && (
        <Route path="/admin">
          <AdminPage />
        </Route>
      )}
      {/* MAIN ROUTES */}
      <Route path="/welcome">
        <DefaultPage signedUser={signedUser} page="unknown">
          <WelcomePage user={user} />
        </DefaultPage>
      </Route>
      <Route exact path="/reset/:actionID">
        <DefaultPage
          signedUser={signedUser}
          incompleteRegistration={!signedUser && user ? true : false}
          page="unknown"
        >
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <PasswordPageNew />
            )
          ) : (
            <PasswordPageNew />
          )}
        </DefaultPage>
      </Route>
      <Route path="/forgot">
        <DefaultPage
          signedUser={signedUser}
          incompleteRegistration={!signedUser && user ? true : false}
          page="unknown"
        >
          {!signedUser ? (
            user ? (
              <SignUpRedirect user={user} />
            ) : (
              <PasswordPageForgot />
            )
          ) : (
            <PasswordPageForgot />
          )}
        </DefaultPage>
      </Route>
      <Route path="/register">
        <DefaultPage
          signedUser={signedUser}
          incompleteRegistration={!signedUser && user ? true : false}
          page="unknown"
        >
          <SignUpRedirect user={user} />
        </DefaultPage>
      </Route>
      <Route exact path="/">
        {!signedUser ? (
          user ? (
            <DefaultPage
              signedUser={signedUser}
              incompleteRegistration={true}
              page="unknown"
            >
              <SignUpRedirect user={user} />
            </DefaultPage>
          ) : (
            <HomePage signedUser={signedUser}>
              <HomePageContent signedUser={signedUser} />
            </HomePage>
          )
        ) : (
          <HomePage signedUser={signedUser}>
            <HomePageContent signedUser={signedUser} />
          </HomePage>
        )}
      </Route>
      {/* NONEXISTENT ROUTE */}
      <Route path="/*">
        <DefaultPage signedUser={signedUser} page="unknown">
          <UnknownPage />
        </DefaultPage>
      </Route>
    </Switch>
  )
}

export default Routes
