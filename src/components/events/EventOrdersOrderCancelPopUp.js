import TemplateModal from "../TemplateModal"

const EventOrdersOrderCancelPopUp = ({
  orderId,
  show,
  handleClose,
  handleDeleteOrder,
}) => (
  <TemplateModal
    show={show}
    handleClose={handleClose}
    handleSubmit={handleDeleteOrder}
    title={`Poista tilaus ${orderId}`}
    cancelButtonLabel="Peruuta"
    submitButtonVariant="danger"
    submitButtonLabel="Poista"
  >
    <p className="fs-6">Oletko täysin varma, että haluat poistaa tämän tilauksen?</p>
    <p className="mb-0 fs-6">
      Tilauksen tuotteet tullaan palauttamaan myyntiin, mutta voit tarvittaessa muuttaa
      tuotteiden varastoarvoja tai tilaisuuksia, joissa tuotteet ovat myynnissä.
    </p>
  </TemplateModal>
)

export default EventOrdersOrderCancelPopUp
