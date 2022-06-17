import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Container from "react-bootstrap/Container"
import HomePageNav from "./HomePageNav"

const DefaultPage = ({ signedUser, incompleteRegistration, page, children }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    // scroll to top of route change
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Container fluid className="mt-5">
      <HomePageNav
        signedUser={signedUser}
        incompleteRegistration={incompleteRegistration}
        page={page}
      />
      {children}
    </Container>
  )
}

export default DefaultPage
