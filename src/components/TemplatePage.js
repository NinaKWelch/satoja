import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import SocialShareModal from "./SocialShareModal"
import TemplatePageHeaderWithNav from "./TemplatePageHeaderWithNav"
import TemplatePageHeader from "./TemplatePageHeader"

const TemplatePage = ({ pageHeader, backLink, shareLink, pageColor, children }) => {
  const [show, setShow] = useState(false)

  return (
    <Container className={`template-page-container ${pageColor}`} fluid>
      <SocialShareModal
        show={show}
        handleClose={() => setShow(false)}
        shareLink={shareLink}
      />
      {backLink ? (
        <TemplatePageHeaderWithNav
          pageHeader={pageHeader}
          shareLink={shareLink}
          handleShow={() => setShow(true)}
        />
      ) : (
        <TemplatePageHeader pageHeader={pageHeader} />
      )}
      {children}
    </Container>
  )
}

export default TemplatePage
