import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSellerProfile } from "../../actions/authedUser"
import { setPaymentOptions, updatePaymentOptions } from "../../actions/payments"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "../TemplatePage"
import SellerHomePayments from "./SellerHomePayments"
import SellerHomeAreas from "./SellerHomeAreas"

const SellerHomePage = ({ user }) => {
  const dispatch = useDispatch()
  const paymentOptions = useSelector(({ payments }) => payments)

  useEffect(() => {
    // set payment options
    user && dispatch(setPaymentOptions(user.id))
  }, [dispatch, user])

  // update selected areas or payment options
  const updateUserInfo = (changedUser) => dispatch(updateSellerProfile(changedUser))
  const updatePayments = (id, options) => dispatch(updatePaymentOptions(id, options))

  return (
    <TemplatePage pageColor="bg-basic">
      <Row className="h-100">
        <Col xs={12} lg={{ span: 10, offset: 1 }} className="pt-4">
          {user && (
            <Row>
              <Col xs={12} md={6} className="mb-4 text-start">
                {paymentOptions.length > 0 && (
                  <SellerHomePayments
                    user={user}
                    options={paymentOptions}
                    handleUpdatePayments={updatePayments}
                  />
                )}
              </Col>
              <Col xs={12} md={6} className="mb-4 text-start">
                <SellerHomeAreas user={user} handleUpdateUserInfo={updateUserInfo} />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </TemplatePage>
  )
}

export default SellerHomePage
