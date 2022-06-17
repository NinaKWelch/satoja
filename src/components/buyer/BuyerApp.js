import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import BuyerNavBar from "./BuyerNavBar"

const BuyerApp = ({ children }) => {
  const { pathname } = useLocation()
  const signedUser = useSelector(({ signedUser }) => signedUser)

  useEffect(() => {
    // scroll to top of route change
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {children}
      <BuyerNavBar signedUser={signedUser} />
    </>
  )
}

export default BuyerApp
