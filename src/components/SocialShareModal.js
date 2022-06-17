import React, { useState, useRef } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Overlay from "react-bootstrap/Overlay"
import Tooltip from "react-bootstrap/Tooltip"
import { ReactComponent as ClipboardIcon } from "../media/clipboard.svg"
import { ReactComponent as ClipboardCheckIcon } from "../media/clipboard-check.svg"

const SocialShareModal = ({ show, handleClose, shareLink }) => {
  const [copy, setCopy] = useState(false)
  const target = useRef(null)

  // url to current location
  const currentUrl = document.location.href
  const heading = shareLink && shareLink.heading ? shareLink.heading : "Jaa tämä sivu"
  const title = shareLink && shareLink.title ? shareLink.title : "Satoja"
  const hashtag = shareLink && shareLink.hashtag ? shareLink.hashtag : "#satoja"
  const hashtags = shareLink && shareLink.hashtags ? shareLink.hashtags : ["satoja"]

  // copy link to the clipboard
  const handleCopy = () => {
    setCopy(true)

    setTimeout(() => {
      setCopy(false)
    }, 1500)
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="mt-1">
        <Row className="mb-2">
          <Col xs={12} className="mb-2">
            <FacebookShareButton
              url={currentUrl}
              quote={title}
              hashtag={hashtag}
              className="mr-3"
            >
              <FacebookIcon size={48} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={currentUrl}
              title={title}
              hashtags={hashtags}
              className="mr-3"
            >
              <TwitterIcon size={48} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={currentUrl}
              title={title}
              separator=" - "
              className="mr-3"
            >
              <WhatsappIcon size={48} round={true} />
            </WhatsappShareButton>
            <EmailShareButton
              url={currentUrl}
              subject={title}
              body={shareLink && shareLink.message ? shareLink.message : ""}
              separator=" - "
              className="mr-3"
              onClick={() => {}} /** https://github.com/nygardk/react-share/issues/153 */
              openShareDialogOnClick
            >
              <EmailIcon size={48} round={true} />
            </EmailShareButton>
          </Col>
        </Row>
        <Row className="g-2 flex-nowrap">
          <div style={{ width: "calc(100% - 58px)" }}>
            <Form.Group>
              <Form.Control type="text" size="lg" value={currentUrl} disabled />
            </Form.Group>
          </div>
          <div>
            <CopyToClipboard text={currentUrl} onCopy={handleCopy}>
              <Button
                variant="dark"
                size="lg"
                aria-label="Kopioi linkki"
                className="rounded-circle"
                ref={target}
              >
                {copy ? <ClipboardCheckIcon /> : <ClipboardIcon />}
              </Button>
            </CopyToClipboard>
            <Overlay target={target.current} show={copy} placement="left">
              {(props) => (
                <Tooltip id="copy-tip" {...props}>
                  Linkki kopioitu
                </Tooltip>
              )}
            </Overlay>
          </div>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default SocialShareModal
