import Badge from "react-bootstrap/Badge"

const OrganicLabel = ({ onProductPage }) => (
  <div
    className={`${
      onProductPage ? "top-0 start-50 translate-middle-x" : "top-0 start-0"
    } position-absolute`}
  >
    <Badge
      variant="warning"
      className={`${
        onProductPage ? "mt-2" : "m-1"
      } fs-6 text-dark border border-light rounded-pill`}
    >
      {onProductPage ? "Luomu" : "L"}
    </Badge>
  </div>
)

export default OrganicLabel
